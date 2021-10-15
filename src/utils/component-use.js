import Vue from 'vue'
import {
    Layout,
    Menu,
    Icon,
    Avatar,
    Dropdown,
    Row,
    Form,
    Input,
    Button,
    Breadcrumb,
    Table,
    Col,
    Upload,
    DatePicker,
    TimePicker,
    Steps,
    InputNumber,
    Radio,
    Select,
    Modal,
    ConfigProvider,
    Checkbox,
    Spin,
    Switch,
    Tag,
    Tabs,
    Empty,
    Pagination,
    Timeline,
    Carousel,
    List,
    message,
    Divider,
    Tooltip,
    Popover,
    Collapse,
    Card,
    Tree,
    Calendar,
    Popconfirm,
    Cascader
} from 'ant-design-vue'

// 设置时间处理为中文
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(Table)
Vue.use(Col)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Steps)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Modal)
Vue.use(ConfigProvider)
Vue.use(Checkbox)
Vue.use(Spin)
Vue.use(Switch)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(Empty)
Vue.use(Pagination)
Vue.use(Timeline)
Vue.use(Carousel)
Vue.use(List)
Vue.use(Divider)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Collapse)
Vue.use(Card)
Vue.use(Tree)
Vue.use(Calendar)
Vue.use(Popconfirm)
Vue.use(Cascader)
// 使用ant组件全局配置
Vue.prototype.$message = message;
// Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm

// 自定义
import customDialog from '@/components/customDialog'
Vue.use(customDialog)


import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/components/',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 剥去文件名开头的 `./` 和结尾的扩展名
            fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
    )

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})
