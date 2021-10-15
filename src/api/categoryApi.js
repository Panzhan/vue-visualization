// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/util'
const CategoryApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000051
    // video 列表
    findpage: (params = {}) => {
        return POST('/api/accountservice/video/findpage', params)
    },
}
export default CategoryApi
