import router from 'router'
import NProgress from 'nprogress'

import { getCookie } from 'utils/cookie'

const whitelist = ['login']

router.beforeEach((to, from, next) => {
    NProgress.start(0)
    if (getCookie()) {
        if (whitelist.includes(to.name)) {
            next(false)
        } else {
            next()
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
