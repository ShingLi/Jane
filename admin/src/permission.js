import router from 'router'
import NProgress from 'nprogress'

import { getCookie } from 'utils/cookie'

const whitelist = [ 'login' ]

router.beforeEach((to, from, next) => {
    NProgress.start(0)
    if (getCookie()) {
        
    } else {
        if (!whitelist.includes(to.name)) {
            router.push({
                path: '/'
            })
        } else {
            next()
        }
    }
})
// 登录
    // 访问白名单页面，如果是passport登录页面重定向到首页（按理来说应该是访问白名单页面到前一个页面）
    // 受限资源页面放过
        // 获取当前用户到账号密码，获取对应的权限
            // 获取成功
                // 比对路由权限生成对应权限到路由表，vuex挂载路由
            // 获取失败
                // 清除cookie
// 没登录
    // 访问页面是白名单页面放过
    // 访问页面是受限资源页面重定向到passport登陆页面
router.afterEach((to, from, next) => {
    NProgress.done(true)
})

export default permission