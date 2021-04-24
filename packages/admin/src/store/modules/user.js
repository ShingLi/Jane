import http from 'config/http'
import { setCookie, getCookie } from 'utils/cookie'

const state = {
    token: getCookie('token') || '', // token
    roles: [], // 权限
    avatar: '', // 头像
    username: '路过一片云', // 用户名
}

const mutations = {
    SETTOKEN (state, token) {
        state.token = token
        setCookie('token', token, 1 / 48)
    }
}

const actions = {
    // 登录、注册
    login ({ commit }, info) {
        const { url, ...userinfo } = info
        return new Promise((resolve, reject) => {
            http.post(url == 'login' ? 'login' : 'signup', userinfo).then(({ token = '' }) => {
                if (token) {
                    commit('SETTOKEN', token)
                }
                resolve(token)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // 获取用户信息
    userInfo ({ commit, state: { token } }) {
        http.post('userinfo').then(res => {
            console.log(res)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
