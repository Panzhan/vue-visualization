const getters = {
    permissions: state => state.base.permissions,
    pagePermissions: state => state.base.pagePermissions,
    addRoutes: state => state.base.addRoutes,
    routes: state => state.base.routes,
    userInfo: state => state.base.userInfo,
}
export default getters
