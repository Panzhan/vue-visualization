// 账号管理页面的所有接口
import {
    POST,
    GET,
    MD5
} from '@/utils/util'
const SysAccountApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000032
    // 平台角色列表
    findpage: (params = {}) => {
        return POST('/api/accountservice/role/findpage', params)
    },
    // 添加角色
    roleSave: (params = {}) => {
        return POST('/api/accountservice/role/save', params)
    },
    // 更新角色状态 0启用 1停用 2删除
    updatestatus: (params = {}) => {
        return POST('/api/accountservice/role/updatestatus', params)
    },
    // 获取公司和部门信息
    getcompanyanddepartment: (params = {}) => {
        return GET('/api/accountservice/adminuser/getcompanyanddepartment', params)
    },
    // 获取角色名称
    getrolelist: (params = {}) => {
        return GET('/api/accountservice/role/getrolelist', params)
    },
    // 运营后台账户管理列表
    adminuserFindpage: (params = {}) => {
        return POST('/api/accountservice/adminuser/findpage', params)
    },
    // 添加运营管理账户
    adminuserSave: (params = {}) => {
        let {
            password,
        } = params || {}
        let filterParams = {
            ...params,
            password: password && MD5(password) || ''
        }
        if(!filterParams.password) delete filterParams.password
        return POST('/api/accountservice/adminuser/save', filterParams)
    },
    // 查询运营账户详情
    adminuserDetails: (params = {}) => {
        return GET('/api/accountservice/adminuser/details', params)
    },
    // 更新运营账户信息
    adminuserUpdate: (params = {}) => {
        let {
            password,
        } = params || {}
        let filterParams = {
            ...params,
            password: password && MD5(password) || ''
        }
        if(!filterParams.password) delete filterParams.password
        return POST('/api/accountservice/adminuser/update', filterParams)
    },
    // 更新运营账户状态
    adminuserUpdateStatus: (params = {}) => {
        return POST('/api/accountservice/adminuser/updatestatus', params)
    },
    // 运营账户重置密码
    adminuserUpdatePwd: (params = {}) => {
        let {
            password,
            oldpassword
        } = params || {}
        let filterParams = {
            ...params,
            password: password && MD5(password) || '',
            oldpassword: oldpassword && MD5(oldpassword) || ''
        }
        if(!filterParams.password) delete filterParams.password
        if(!filterParams.oldpassword) delete filterParams.oldpassword
        return POST('/api/accountservice/adminuser/updatepwd', filterParams)
    },
    // 用户管理列表
    userFindpage: (params = {}) => {
        return POST('/api/accountservice/user/findpage', params)
    },
    // 更新用户状态
    upUserFindpage: (params = {}) => {
        return POST('/api/accountservice/user/updatestatus', params)
    },
    // 角色权限查询
    permissionsDetail: (params = {}) => {
        return GET('/api/accountservice/role/findone', params)
    },
    // 角色权限更新
    permissionsUpdate: (params = {}) => {
        return POST('/api/accountservice/role/update', params)
    },
}
export default SysAccountApi
