export default function ({ $axios, redirect }, inject) {
    /* licheng axios 全局处理
    -------------------------- */
    $axios.setHeader('Authorization', 'jane')

    $axios.onRequset(config => {
        if (process.env.NODE_ENV  == 'development') {
            // 从本地读取json
        }
    })

    $axios.onResponse(response => {
        
    })
    
    $axios.onError(error => {
        if (error == 9999) {
            redirect('status')
        }
    })
}