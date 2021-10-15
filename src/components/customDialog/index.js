import vue from 'vue'

// 这里就是我们刚刚创建的那个静态组件
import customDialog from './customDialog.vue'

const DialogConstructor = vue.extend(customDialog)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间, configType,确定按钮背景颜色
const showDialog = ({
    title = '',
    message = '',
    cancelTitle = '取消',
    configTitle = '确定',
    cancel = () => {},
    ok = () => {},
    single = false,
    autoFocus = true,
    configBgType = 'nomal'
} = {}) => {
    const dialogDom = new DialogConstructor({
        el: document.createElement('div'),
        data() {
            return {
                title,
                message,
                visible: true,
                cancelTitle,
                configTitle,
                configBgType,
                single,
                autoFocus,
                cancel,
                ok,
            }
        }
    })

    document.body.appendChild(dialogDom.$el)
}

// 注册为全局组件的函数
function registryDialog() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$dialog()
    vue.prototype.$customDialog = showDialog
}

export default registryDialog
