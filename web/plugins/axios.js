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
        return response
    })

    $axios.onError(error => {
        if (error == 9999) {
            redirect('status')
        }
    })
}
