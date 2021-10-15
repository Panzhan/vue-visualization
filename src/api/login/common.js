// 账号管理页面的所有接口
import {
    POST,
    GET,
    MD5,
} from '@/utils/util'
const Api = {
    // 运营账户登录
    login: (params = {}) => {
        let {
            password,
        } = params || {}
        return POST('/api/accountservice/adminuser/open/login', {
            ...params,
            password: MD5(password)
        })
    },
    getMenuListById: (params = {}) => {
        return GET('/api/accountservice/adminuser/getsysmenu', params)
    },
}
export default Api
