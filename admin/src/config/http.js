import axios from 'axios'
import { getCookie } from 'utils/cookie'
import { message } from 'element-ui'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5000
})

instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = getCookie()
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
            message({
                message: responseMsg || '返回值错误',
                type: 'error',
                duration: 1500
            })
        } else return response.data
    },
    err => {
        return Promise.reject(err)
    }
)

export default instance
