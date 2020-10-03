import axios from 'axios'
import urls from 'config/urls'
import { getCookie } from 'utils/cookie'
import { Message } from 'element-ui'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5000,
})

instance.interceptors.request.use(
    config => {
        // 请求头带上token
        config.headers['Authorization'] = getCookie('token')
        // 判断是相对路径还是绝对路径，以此区分是否走本地url 地址
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
            return Promise.reject(new Error('错误'))
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
