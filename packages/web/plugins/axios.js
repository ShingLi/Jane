import consola from 'consola'
export default function ({ $axios, redirect, error }, inject) {
    /* axios 全局处理
    -------------------------- */
    $axios.setHeader('Authorization', 'jane')

    // $axios.onRequest(config => {
    //     if (process.env.NODE_ENV === 'development') {
    //         // 从本地读取json
    //     }
    //     return config
    // })

    $axios.onResponse(response => {
        const { data: { responseCode, responseMsg, responseData } } = response
        if (responseCode == '0000') {
            return responseData
        } else {
            if (process.client) {
                consola.info('axios--服务端请求')
            } else {
                consola.info('axios--客户端请求')
            }
        }
    })

    $axios.onError(error => {
        // 这里错误
        consola.error('axios--onerror函数', error)
    })
}
