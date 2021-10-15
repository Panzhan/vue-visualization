// 账号管理页面的所有接口
import {
    POST,
    GET,
} from '@/utils/util'
const MenuApi = {
    // https://www.tapd.cn/68250976/markdown_wikis/show/#1168250976001000069
    // 菜单列表
    findpage: (params = {}) => {
        return POST('/api/accountservice/sysmenu/findpage', params)
    },
    // 添加菜单
    sysmenuSave: (params = {}) => {
        return POST('/api/accountservice/sysmenu/save', params)
    },
    // 修改菜单
    update: (params = {}) => {
        return POST('/api/accountservice/sysmenu/update', params)
    },
    // 菜单详情
    findone: (params = {}) => {
        return GET('/api/accountservice/sysmenu/findone', params)
    },
    // 删除菜单
    updatestatus: (params = {}) => {
        return POST('/api/accountservice/sysmenu/updatestatus', params)
    },
}
export default MenuApi
