import Vue from 'vue'
import VueRouter from 'vue-router'
import { from } from 'core-js/fn/array'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {
            name: 'login'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('views/login/login')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    next()
})
export default router
