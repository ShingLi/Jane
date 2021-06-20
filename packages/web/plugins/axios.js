import consola from 'consola'
import BASE_URL from 'config/env'
import { Message } from 'element-ui'

export default function ({ $axios, redirect, error }, inject) {
    /* axios 全局处理 请求头带上token
    -------------------------- */
    $axios.setHeader('Authorization', 'jane')
    // 
    // $axios.defaults.baseURL = BASE_URL

    $axios.onRequest(config => {
        return config
    })

    $axios.onResponse(response => {
        const { data: { responseCode, responseMsg, responseData } } = response
        if (responseCode != '0000') {
            responseMsg && Message({
                message: responseMsg,
                type: 'error',
                duration: 2000,
            })
        } else {
            if (responseMsg) {
                Message({
                    message: responseMsg,
                    type: 'success',
                    duration: 2500,
                })
            }
            return responseData ?? {}
        }
    })

    $axios.onError(err => {
        // 这里错误
        if (err) {
            
            console.log('exec===> error')
            console.dir(err)
            error({
                statusCode: err?.response?.status ?? 500,
                messgae: err?.response?.statusText + '' + err?.response?.data.responseMsg ?? ''
            })
        }
        return Promise.resolve(false)
        
    })
}
