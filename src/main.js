import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import './utils/component-use'
import {
    GlobalFunc
} from './utils/toastMixin'

import 'ant-design-vue/dist/antd.css'
import './assets/css/app.scss'
// 设置路由勾子
import router from '@/plugins/router'
// 自定义绑定勾子
import './directive';
// 全局组件
import Pagination from "@/components/Pagination"; //分页组件
import FormItems from '@/components/formItems'; // form表单
import PreviewPic from "@/components/PreviewPic"; // 图片预览
import DTab from '@/components/DTab'; // 顶部tab切换
import DPopup from '@/components/DPopup'; // 顶部tab切换
import DelUpdate from '@/components/DelUpdate'
import { FormModel } from 'ant-design-vue';
import moment from 'moment'
Vue.use(FormModel);
// 全局函数
import {
    objToArray,
    sortByKey,
    getBase64,
    openOutLink,
    filterInvalidObj,
    numFormat
} from './utils/help'
Vue.prototype.objToArray = objToArray
Vue.prototype.getBase64 = getBase64
Vue.prototype.openOutLink = openOutLink
Vue.prototype.filterInvalidObj = filterInvalidObj
Vue.prototype.numFormat = numFormat
Vue.prototype.sortByKey = sortByKey

window.GLOBAL.vbus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$isMobile = /android/g.test(navigator.userAgent.toLowerCase()) || /iphone/g.test(navigator.userAgent.toLowerCase());

import VueClipboard from 'vue-clipboard2' //复制
Vue.use(VueClipboard)

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('FormItems', FormItems)
Vue.component('PreviewPic', PreviewPic)
Vue.component('DTab', DTab)
Vue.component('DPopup', DPopup)
Vue.component('DelUpdate', DelUpdate)

Vue.filter('numberFixedAfterPoint', function (value) {
    if (!value) return '-'
    let _num = value.toFixed(3);
    return _num.substr(0, _num.length - 1)
})
Vue.filter('priceBeautify', function (value) {
    if (!value) return 0
    let temVal = (value.toString().indexOf('.') !== -1) ? value.toLocaleString() : value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return temVal
})
Vue.directive('preventReClick', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.setAttribute('disabled', 'true')
                el.disabled = true
                setTimeout(() => {
                    el.setAttribute('disabled', 'false')
                    el.removeAttribute('disabled')
                    el.disabled = false
                }, binding.value || 2000)
            }
        })
    }
})
Vue.directive('el-hover', {
    bind(el, binding) {
        let elData = binding.value;
        el.onmouseover = function () {
            if (elData && elData.callback && typeof elData.callback === 'function') {
                elData.callback(elData.val)
            }
            el.classList.add("active");
        };
        el.onmouseout = function () {
            if (elData && elData.callback && typeof elData.callback === 'function') {
                elData.callback('close')
            }
            el.classList.remove("active");
        };
        el.onclick = function () { };
    },
})
Vue.mixin(GlobalFunc)

new Vue({
    data: {
        $form: (options = { name: 'compontForm' }) => this.$form.createForm(this, options)
    },
    router,
    store,
    moment,
    render: h => h(App),
}).$mount('#app')
