// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/util'
const VideoApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000051
    // video 列表
    findpage: (params = {}) => {
        return POST('/api/accountservice/video/findpage', params)
    },
    // video 详情
    videoDetail: (params = {}) => {
        return GET('/api/accountservice/video/findone', params)
    },
    // video 增
    videoSave: (params = {}) => {
        return POST('/api/accountservice/video/save', params)
    },
    // video改
    videoUpdate: (params = {}) => {
        return POST('/api/accountservice/video/update', params)
    },
    // video 删
    videoDel: (params = {}) => {
        return POST('/api/accountservice/video/delete', params)
    },
}
export default VideoApi
