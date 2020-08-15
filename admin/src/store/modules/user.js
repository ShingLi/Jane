import urls from 'config/urls'
import http from 'config/http'

const state = {
    token: ''
}

const mutations = {
    SETTOKEN (state, token) {
        state.token = token
    }
}

const actions = {
    login ({ commit }, userinfo) {
        return new Promise((resolve, reject) => {
            http.post(urls.login, userinfo).then(({ token }) => {
                commit('SETTOKEN', token)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    signup ({ commit }, registerinfo) {
        
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
