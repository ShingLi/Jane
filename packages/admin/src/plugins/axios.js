import axios from 'axios'

import urls from './interface'
import store from 'store'

import { getCookie, removeCookie } from 'utils/cookie'
import { Message } from 'element-ui'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5000,
    validateStatus: status => {
        // 处理下token错误的返回状态码 否则axios直接reject  登录失效 401  客户端错误422
        return status >= 200 && status <= 500
    }
})

instance.interceptors.request.use(
    config => {
        // 请求头带上token
        if (getCookie('token')) {
            config.headers['Authorization'] = `Bearer ${getCookie('token')}`
        }
        // 判断是相对路径还是绝对路径，以此区分是否走本地url地址
        config.url = config.url.includes('://') ? config.url : urls[config.url]
        // 因为基础baseURL是 //localhost:4000/admin web端接口白名单是/web 这里需要修正下请求URl
        // console.log(config)
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    response => {
        const { data: { responseCode, responseMsg, responseData }, config: { headers: { noTips } } } = response
        if (responseCode != '0000') {
            responseMsg && Message({
                message: responseMsg,
                type: 'error',
                duration: 2000,
            })
            // token失效或者不正确 (退出登陆)
            if (responseCode == '5015') {
                setTimeout(() => {
                    store.dispatch('user/signout', 'autosignouts')
                }, 2000)
            }
        } else {
            if (responseMsg && !noTips) {
                Message({
                    message: responseMsg,
                    type: 'success',
                    duration: 2500,
                })
            }
            return responseData ?? {}
        }
    },
    err => {
        Message.error({
            message: err,
            duration: 1500,
        })
        return Promise.reject(err)
    }
)

export default instance
