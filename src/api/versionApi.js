// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/util'
const VersionApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000065
    // 版本更新管理列表
    findpage: (params = {}) => {
        return POST('/api/accountservice/versionconfig/findpage', params)
    },
    // 添加版本更新信息
    versionconfigSave: (params = {}) => {
        return POST('/api/accountservice/versionconfig/save', params)
    },
    // 版本信息 详情
    findone: (params = {}) => {
        return GET('/api/accountservice/versionconfig/findone', params)
    },
    // 版本信息状态更新
    updateStatus: (params = {}) => {
        return POST('/api/accountservice/versionconfig/updatestatus', params)
    },
    edit: (params = {}) => {
        return POST('/api/accountservice/versionconfig/update', params)
    },
}
export default VersionApi
