import axios from 'axios'
import { Toast } from 'vant'

const server  = axios.create({
    baseURL: '',
    timeout: 5 * 1000
})

server.interceptors.request.use(
    config => {

    },
    error => {
        return Promise.reject('请求出错')
    }
)

server.interceptors.response.use(
    res => {
        let { data } = res
    },
    error => {}
)
export default server
