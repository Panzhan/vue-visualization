// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/util'
const OrderApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000101
    // 鉴定订单列表
    findpage: (params = {}) => {
        return POST('/api/checkservice/check/findpage', params)
    },
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000102
    // 获取鉴定列表tab数量
    gettabcount: (params = {}) => {
        return POST('/api/checkservice/check/gettabcount', params)
    },
    // 获取鉴定下拉框配置
    getcheckconfig: (params = {}) => {
        return GET('/api/checkservice/checker/getcheckconfig', params)
    },
    
}
export default OrderApi
