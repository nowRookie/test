import { Message } from 'element-ui';

export default {
    install(Vue) {
        const msgType = ["success", "error", "info", "warning"]
        function msgFun(options) {
            if (document.getElementsByClassName('el-message').length !== 0) {
                Message.closeAll()
            }
            Message({
                ...options,
                showClose: true,
                duration: 8000
            })
        }
        msgType.forEach((item, index) => {
            msgFun[item] = (str, options) => {
                if (document.getElementsByClassName('el-message').length !== 0) {
                    Message.closeAll()
                }
                Message({
                    ...options,
                    type: item,
                    message: str,
                    showClose: true,
                    duration: 8000
                })
            }
        })
        Vue.prototype.$message = msgFun
    }
}