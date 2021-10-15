// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/util'
const BannerApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000051
    // banner列表
    findpage: (params = {}) => {
        return POST('/api/accountservice/banner/findpage', params)
    },
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000055
    // 删除 banner
    bannerDelete: (params = {}) => {
        return POST('/api/accountservice/banner/delete', params)
    },
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000053
    // 添加 banner
    bannerSave: (params = {}) => {
        return POST('/api/accountservice/banner/save', params)
    },
    // 更新 banner
    bannerUpdate: (params = {}) => {
        return POST('/api/accountservice/banner/update', params)
    },
    // 结束 banner
    endbanner: (params = {}) => {
        return POST('/api/accountservice/banner/endbanner', params)
    },
    // banner 详情
    bannerDetail: (params = {}) => {
        return GET('/api/accountservice/banner/findone', params)
    },
    // banner 排序
    updatesort: (params = {}) => {
        return POST('/api/accountservice/banner/updatesort', params)
    },
    // banner tab数量
    gettabcount: (params = {}) => {
        return POST('/api/accountservice/banner/gettabcount', params)
    },
}
export default BannerApi
