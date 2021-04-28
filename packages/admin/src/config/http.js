import axios from 'axios'
import urls from 'config/http-url'
import router from '../permission'

import { getCookie, removeCookie } from 'utils/cookie'
import { Message } from 'element-ui'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5000,
    validateStatus: status => {
        // 处理下token错误的返回状态码 否则axios直接reject
        return status >= 200 && status <= 401
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
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    response => {
        const { data: { responseCode, responseMsg } } = response
        if (responseCode != '0000') {
            Message({
                message: responseMsg || '返回值错误',
                type: 'error',
                duration: 2000,
            })
            // token失效或者不正确
            if (responseCode == '5015') {
                setTimeout(() => {
                    removeCookie('token')
                    // 登录之后要回到原来的页面
                    router.replace({
                        path: '/login',
                        query: {
                            oldpath: router.currentRoute.fullpath
                        }
                    })
                }, 2100)
            }
        } else {
            if (responseMsg) {
                Message({
                    message: responseMsg,
                    type: 'success',
                    duration: 2500,
                })
            }
            return response.data
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
