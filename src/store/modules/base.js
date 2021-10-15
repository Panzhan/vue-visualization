import { Api, CheckerApi, SysAccountApi } from '@/api'
const ls = window.localStorage

const userkey = 'vueVisualization' // 海外项目运营 localStorage key
const state = {
    DeSettings: {
        Device: 'desktop',
        navTheme: 'light', // theme for nav menu
        primaryColor: '#3270F5', // primary color of ant design
        layout: 'sidemenu', // nav menu position: sidemenu or topmenu
        fixedHeader: true, // sticky header
        fixSiderbar: true // sticky siderbar
    },
    userInfo: {}, // 用户信息
    addRoutes: [],
    routes: [],
    permissions: [], // 按钮级别权限
    pagePermissions: [], //页面级别权限（所有页面）
    checkerList: [], // 鉴定师列表
    roleList: [], // 角色列表
    brandList: [], //品牌列表
    categoryList: [], //类目列表
    checkcategorynameList: [], //商品-类目 列表
    companyList: [], // 公司列表
    departmentList: [], // 部门列表
    menuList: [], // 菜单列表展示在菜单栏，会过滤无二级菜单的一级目录
    allMenuList: [], //所有接口返回菜单
}

const getters = {
    getUserInfo: state => {
        const {
            token
        } = state.userInfo || {}
        if (!token) {
            state.userInfo = JSON.parse(ls.getItem(userkey))
        }
        return state.userInfo
    }
}

const mutations = {
    setUserInfo(state, payload = {}) {
        state.userInfo = payload
    },
    clearState(state) {
        state.userInfo = {}
    },
    setRoles(state, payload) {
        state.addRoutes = payload
        state.routes = [...payload]
    },
    setButtonPermissions(state, payload) {
        state.permissions = payload
    },
    setPagePermissions(state, payload){
        state.pagePermissions = payload
    },
    setChecker(state, payload){
        state.checkerList = payload
    },
    setRoleList(state, payload){
        state.roleList = payload
    },
    setBrandList(state, payload){
        state.brandList = payload
    },
    setCategoryList(state, payload){
        state.categoryList = payload
    },
    setCheckcategorynameList(state, payload){
        state.checkcategorynameList = payload
    },
    setCompanyList(state, payload){
        state.companyList = payload
    },
    setDepartmentList(state, payload){
        state.departmentList = payload
    },
    setMenuList(state, payload){
        state.menuList = payload
    },
    setAllMenuList(state, payload){
        state.allMenuList = payload
    }
}
const actions = {
    async getMenuList({
        commit,
        state
    }) {
        let vueVisualization = ls.getItem('vueVisualization')
        let localId = vueVisualization && JSON.parse(vueVisualization).id
        const {
            id
        } = state.userInfo
        try {
            let data = await Api.getMenuListById({
                id: id || localId
            });
            if (data && data.length > 0) {
                commit('setButtonPermissions', filterButtonPermissions([...data]));
                commit('setPagePermissions', filterPagePermissions([...data]));
                const _data = formattingMenuList(data)
                const allMenuList = JSON.parse(JSON.stringify(_data))
                commit('setAllMenuList', allMenuList)
                const filterMenuList = filterEmptyRouter(_data)
                commit('setMenuList', filterMenuList)
                return data
            } else {
                return []
            }
        } catch (error) {
            throw 'getMenuList Request failed, ' + JSON.stringify(error)
        }
    },
    // 获取品牌列表
    async getBrandList({commit, state}){
        try {
            let res = await CheckerApi.brandAll()
            commit('setBrandList', res)
        }catch(error){
            commit('setBrandList', [])
            throw 'getBrandList Request failed, ' + JSON.stringify(error)
        }
    },
    // 获取类目列表
    async getCategoryList({commit, state}){
        try{
            let res = await CheckerApi.categoryAll()
            commit('setCategoryList', res)
        }catch(error){
            commit('setCategoryList', [])
            throw 'getCategoryList Request failed, ' + JSON.stringify(error)
        }
    },
    // 获取所有鉴定师用户列表
    getChecker({commit}){
        CheckerApi
            .getAllChecker()
            .then((res)=>{
                commit('setChecker', res)
            })
    },
    // 获取角色名称
    getRolesList({commit, state}){
        SysAccountApi
            .getrolelist()
            .then((res)=>{
                commit('setRoleList', res)
            })
    },
    // 商品-类目 列表
    getCheckcategorynameList({commit, state}){
        CheckerApi
            .getcheckrangeall()
            .then((res)=>{
                commit('setCheckcategorynameList', res)
            })
    },
    // 获取公司和部门信息列表
    getcompanyanddepartment({commit, state}){
        SysAccountApi
            .getcompanyanddepartment()
            .then((res)=>{
                commit('setCompanyList', res.companys)
                commit('setDepartmentList', res.departments)
            })
    },
}

function filterEmptyRouter(menuList){
    // 过滤type ==1 且无children 的一级菜单
    return menuList.filter(it=>!(!it.children.length && it.type==1))
}

function formattingMenuList(menuList){
    // list 转化为 children
    for(let i=0; i<menuList.length; i++){
        menuList[i].children = menuList[i].list || []
        delete menuList[i].list
        if(menuList[i].children.length){
            formattingMenuList(menuList[i].children)
        }
    }
    return menuList
}
function isArray(obj) {   // 判断是否是数组类型
    return Object.prototype.toString.call(obj) === '[object Array]';
}
function isObject(obj){  // 判断是否是对象类型
    return Object.prototype.toString.call(obj) === '[object Object]';
}
// 遍历后台传来的按钮字符串, 存储权限, 一级页面和二级页面
function filterButtonPermissions(menu) {
    const permissions = [];
    menu.forEach((it)=>eachList(it))
    function eachList(menu){
        for(var i in menu){
            if(menu[i].type==4 ){
                const {
                    permissionid = ''
                } = menu[i];
                if(permissionid){
                    if(!permissions.includes(permissionid)){
                        permissions.push(permissionid)
                    }
                }
            }
            if((isArray(menu[i]) && menu[i].length) || (isObject(menu[i]) && Object.keys(menu[i]).length)){
                eachList(menu[i])
            }
        }
    }
    return permissions
}

// 遍历后台传来的路由字符串，存储页面权限
function filterPagePermissions(menu) {
    const permissions = [];
    menu.forEach((it)=>eachList(it))
    function eachList(menu){
        for(var i in menu){
            const {
                path = ''
            } = menu[i];
            if(path && menu[i] && menu[i].type){
                [2,3].includes(menu[i].type) && permissions.push(path)
            }
            if((isArray(menu[i]) && menu[i].length) || (isObject(menu[i]) && Object.keys(menu[i]).length)){
                eachList(menu[i])
            }
        }
    }
    return [...new Set(permissions)]
}

export const loadView = view => {
    // 路由懒加载
    return {
        component: () => import(`@/views/${view}/`)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
