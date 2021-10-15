import { message } from 'ant-design-vue'

message.config({
  top: '50vh',
  duration: 1.5,
  maxCount: 2
})

const GlobalFunc = {
  methods: {
    /** type: 'success'、'error' 、'warning' */
    toast (msg, type) {
      switch (type) {
        case 'success':
          message.success(msg)
          break
        case 'error':
          message.error(msg)
          break
        case 'warning':
          message.warning(msg)
          break
        default:
          message.open({
            content: msg
          })
      }
    }
  }
}
const ModalConfg = {
  centered: true,
  maskClosable: true,
  cancelText: '取消',
  destroyOnClose: true,
  okText: '确定',
  icon: 'null'
}

export { GlobalFunc, ModalConfg }
