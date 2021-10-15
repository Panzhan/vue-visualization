import store from '@/store'

/**
 * @desc 动态改变权限判断
 * @param {Array} value
 * @returns {Boolean}
 */
export function hasPermission(value) {
    const routes = store.getters && store.getters.routes || [];
    let permissions = [];
    const filterPermissions = (route) => {
        const {
            path
        } = route
        permissions.push(path);
        if (route.children && route.children.length > 0) {
            route.children.forEach(it => filterPermissions(it));
        }
    }
    routes.forEach(it => filterPermissions(it));

    if (value.length > 0 && permissions.length > 0) {
        const hasPermission = permissions.some(path => {
            return path === value;
        })
        if (!hasPermission) {
            return false
        }
        return true
    } else {
        return false
    }
}
