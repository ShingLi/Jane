import http from 'config/http'
import { setCookie, getCookie } from 'utils/cookie'

const state = {
    token: getCookie() || '',
    roles: []
}

const mutations = {
    SETTOKEN (state, token) {
        state.token = token
        setCookie('token', token)
    }
}

const actions = {
    login ({ commit }, info) {
        const { url, ...userinfo } = info
        return new Promise((resolve, reject) => {
            http.post(url == 'login' ? 'login' : 'signup', userinfo).then(({ token }) => {
                commit('SETTOKEN', token)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
