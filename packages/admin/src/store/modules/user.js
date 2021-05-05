import http from 'plugins/axios'
import { setCookie, getCookie, removeCookie } from 'utils/cookie'
import { Message, MessageBox } from 'element-ui'
import router from '@/permission'

const state = {
    token: getCookie('token') || '', // token
    roles: [], // 权限
    userInfo: {}
}

const mutations = {
    SETTOKEN (state, token) {
        state.token = token
        setCookie('token', token, 1 / 48)
    },
    REMOVETOKEN () {
        removeCookie('token')

        router.replace({
            path: '/login',
            query: {
                oldpath: router.currentRoute.fullpath
            }
        })
    },
    SETUSERINFO (state, info) {
        state.userInfo = info
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
    // 退出登陆
    signout ({ commit }) {
        MessageBox.confirm('是否要退出登录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                commit('REMOVETOKEN')
                Message({
                    type: 'success',
                    message: '已退出登录',
                })
            })
            .catch(() => {
                Message({
                    type: 'info',
                    message: '已取消退出',
                })
            })
    },
    // 获取用户信息
    userInfo ({ commit, state: { token } }) {
        http.post('userinfo').then(res => {
            console.log('vuex__act--userinfo', res)
            commit('SETUSERINFO', res)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
