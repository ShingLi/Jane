import http from 'plugins/axios'
import { setCookie, getCookie, removeCookie } from 'utils/cookie'
import { Message, MessageBox } from 'element-ui'
import router from '@/permission'

const state = {
    token: getCookie('token') || '', // token
    roles: 'guest', // 权限 guest 访客 admin 管理员
    userInfo: {}
}

const mutations = {
    SETTOKEN (state, token) {
        state.token = token
        setCookie('token', token, 1) // 默认cookie过期一天
    },
    REMOVETOKEN () {
        removeCookie('token')
        router.replace({
            path: '/login',
            query: {
                originUrl: encodeURIComponent(router.currentRoute.fullPath)
            }
        })
    },
    SETUSERINFO (state, info) {
        state.roles = info?.roles ?? 'guest'
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
    signout ({ commit }, signoutType = 'normal') {
        if (signoutType === 'normal') {
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
        } else {
            // 登录失效自动退出登录状态
            commit('REMOVETOKEN')
            Message({
                type: 'success',
                message: '已退出登录',
            })
        }
    },
    // 获取用户信息
    userInfo ({ commit, state: { token } }) {
        http.post('userinfo', {}, {
            headers: {
                noTips: true,
            }
        }).then((userInfo) => {
            // console.log('vuex__act--userinfo', userInfo)
            commit('SETUSERINFO', userInfo)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
