import axios from 'axios'
// import { message } from 'element-ui'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5000
})

console.log(process.env.VUE_APP_BASEURL)
instance.interceptors.request.use(config => {
    return config
})

export default instance
