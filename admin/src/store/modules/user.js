import http from 'config/http'
import { setCookie, getCookie } from 'utils/cookie'

const state = {
    token: getCookie('token') || '', // token
    roles: [], // 权限
    avatar: '', // 头像
    username: '', // 用户名
}

const mutations = {
    SETTOKEN (state, token) {
        state.token = token
        setCookie('token', token)
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
    userInfo ({ commit, state }) {
        http.post('/userinfo', state.token).then(res => {
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
