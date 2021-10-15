/**
 * 全局通用接口
 */
import {
    POST,
    GET
} from '../utils/util'

const uploadImg = (params = {}) => {
    return POST('/api/accountservice/open/upload', params, false)
}

export {
    uploadImg,
}
