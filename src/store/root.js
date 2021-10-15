/**
 * rootState
 */
const state = {
    activeRouterTitle: '', //顶部路由名称
    routePath: '', //路由路径
}

// 全局计算属性
const getters = {
    // store.getters.getTodoById(2)
    // (state: S, getters: any, rootState: R, rootGetters: any)
    // getTodoById: (state) => (id) => {
    // return state.todos.find(todo => todo.id === id)
    // },
}

const mutations = {
    clearState(state) {
        state.outTypes = [];
        state.outStatus = [];
        state.suppliers = [];
        state.sizes = [];
        state.brands = [];
        state.categorys = [];
        state.wareHosts = [];
        state.couponTypes = [];
        state.couponStatus = [];
        state.base.userInfo = {};
        state.base.addRoutes = [];
        state.base.routes = [];
        state.base.permissions = [];
        state.base.menuList = []
        state.base.pagePermissions = []
    },
    setRouteTitle(state, payload){
        state.activeRouterTitle = payload
    },
    setRoutePath(state, payload){
        state.routePath = payload
    }
}

// 异步的action,请求工具限制请求数据不能使用vuex。
const actions = {
    // store.dispatch('aiTest/getAiTestData', payload)
    // { commit, getters, state, dispatch } = store
    // async getAiTestData ({ commit, state }, params) {
    //   await AiTestApi.getAiTestData ()
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
