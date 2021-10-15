import Vue from 'vue';
import hasRole from './hasRole'
import hasPermission from './hasPermission'

const install = function (Vue) {
    Vue.directive('hasRole', hasRole)
    Vue.directive('hasPermission', hasPermission)
}

if (window.Vue) {
    window['hasRole'] = hasRole
    window['hasPermission'] = hasPermission
    Vue.use(install);
}

Vue.use(install);
export default install
