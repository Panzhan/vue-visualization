// 账号管理页面的所有接口
import {
    POST,
    GET,
    MD5,
} from '@/utils/util'
const CheckerApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000080
    // 鉴定师列表
    findpage: (params = {}) => {
        return POST('/api/checkservice/checker/findpage', params)
    },
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000084
    // 删除鉴定师信息
    deleteChecker: (params = {}) => {
        return POST('/api/checkservice/checker/delete', params)
    },
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000082
    // 新增鉴定师
    save: (params = {}) => {
        let {
            password,
        } = params || {}
        let filterParams = {
            ...params,
            password: password && MD5(password) || ''
        }
        if(!filterParams.password) delete filterParams.password
        return POST('/api/checkservice/checker/save', filterParams)
    },
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000105
    // 获取全部鉴定师信息
    getAllChecker: (params = {}) => {
        return GET('/api/checkservice/checker/getall', params)
    },
    // 鉴定师详情
    checkerDetail: (params = {}) => {
        return GET('/api/checkservice/checker/findone', params)
    },
    // 鉴定师更新
    checkerUpdate: (params = {}) => {
        let {
            password,
        } = params || {}
        let filterParams = {
            ...params,
            password: password && MD5(password) || ''
        }
        if(!filterParams.password) delete filterParams.password
        return POST('/api/checkservice/checker/update', filterParams)
    },
    // 获取类目列表
    categoryAll: (params = {}) => {
        return GET('/api/productservice/category/getall', params)
    },
    // 获取品牌列表
    brandAll: (params = {}) => {
        return GET('/api/productservice/brand/getall', params)
    },
    // 鉴定范围列表
    checkrangeList: (params = {}) => {
        return POST('/api/checkservice/checkrange/findpage', params)
    },
    // 添加鉴定范围
    checkrangeSave: (params = {}) => {
        return POST('/api/checkservice/checkrange/save', params)
    },
    // 更新鉴定范围
    checkrangeUpdate: (params = {}) => {
        return POST('/api/checkservice/checkrange/update', params)
    },
    // 鉴定范围详情
    checkrangeDetail: (params = {}) => {
        return GET('/api/checkservice/checkrange/findone', params)
    },
    // 删除鉴定范围
    checkrangeDelete: (params = {}) => {
        return GET('/api/checkservice/checkrange/delete', params)
    },
    // 结算单列表
    settlementList: (params = {}) => {
        return POST('/api/checkservice/settlement/getlist', params)
    },
    // 结算单详情 
    findone: (params = {}) => {
        return POST('/api/checkservice/settlement/findone', params)
    },
    // 结算详情列表 
    getitemlist: (params = {}) => {
        return POST('/api/checkservice/settlement/getitemlist', params)
    },
    // 鉴定类目列表
    getcheckcategoryname: (params = {}) => {
        return GET('/api/checkservice/open/getcheckcategoryname', params)
    }, 
    // 品牌-类目列表
    getcheckrangeall: (params = {}) => {
        return GET('/api/checkservice/checkrange/getcheckrangeall', params)
    },
    // 鉴定记录列表查询
    getcheckloglist: (params = {}) => {
        return GET('/api/checkservice/check/getcheckloglist', params)
    },
}
export default CheckerApi
