export default function ({ $axios, redirect }, inject) {
    /* licheng axios 全局处理
    -------------------------- */
    $axios.setHeader('Authorization', 'jane')

    $axios.onRequest(config => {
        if (process.env.NODE_ENV === 'development') {
            // 从本地读取json
        }
        return config
    })

    $axios.onResponse(response => {
        const { data } = response
        return data
    })

    $axios.onError(error => {
        // 这里错误
        if (error == 9999) {
            // redirect()
        }
    })
}
