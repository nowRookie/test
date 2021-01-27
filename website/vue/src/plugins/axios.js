import axios from "axios"
import qs from "qs"
import { Message } from 'element-ui';
import router, { routes } from '@/router/index.js'
import { loading } from "@/plugins/util"

// console.log("routes=", routes)

let LiFangJin = "http://23.13.5.162:8787"//李芳金
let LiJianHui = "http://23.13.5.208:8787"//李建会
let LiuYang = "http://23.13.5.131:8787"//刘阳

// const api = process.env.VUE_APP_API_URL;
const api = LiJianHui;

// 添加aixo拦截器
axios.interceptors.request.use(function (config) {
    console.log("axios config=", config)
    let { headers } = config
    // if (method.toLowerCase() == "post") {
    //     config.data = qs.stringify(config.data)
    // }
    let token = sessionStorage.getItem("token")
    config.headers = Object.assign({}, headers, { token })
    config.url = api + config.url
    loading(true)
    return config;
}, function (error) {
    loading(false)
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // console.log("axios response=", response)
    loading(false)
    if (response.data.code && response.data.code != 200) {
        Message({ type: "error", message: response.data.msg || response.data.message || "后台状态码code错误！" })
        throw new Error(response.data.msg || response.data.message || "后台状态码code错误！")
    }
    return response;
}, function (error) {
    loading(false)
    if (error.response) {
        let { status } = error.response
        switch (status) {
            case 401:
                Message({ type: "error", message: "登陆过期！" })
                sessionStorage.removeItem("token")
                router.replace({
                    path: "/login"
                })
                break;
            default:
                Message({ type: "error", message: "请求后台错误！" })

        }
    } else {
        Message({ type: "error", message: "网络连接错误！" })
    }
    return Promise.reject(error);
});

export default axios