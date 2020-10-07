import router from 'router'
import store from 'store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getCookie } from 'utils/cookie'

const whitelist = ['login']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // bug fix 要验证token是否有效.
    if (getCookie('token')) {
        if (whitelist.includes(to.name)) {
            next('/')
        } else {
<<<<<<< HEAD
            await store.dispatch('user/userInfo')
            next()
=======
            // next()
            store.dispatch('user/userInfo')
>>>>>>> 388029c24e248f95953f9a21978f10d1673b068f
        }
    } else {
        if (!whitelist.includes(to.name)) {
            router.push({
                path: '/login'
            })
        } else {
            next()
        }
    }
})

router.afterEach((to, from) => {
    NProgress.done(true)
})

export default router
