import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/',
        redirect: {
            name: 'index'
        }
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            requiresAuth: true
        },
        component: () => import('views/index')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('views/login/login')
    }
]

export const asyncRoutes = []

const createRoutes = () => constantRoutes

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: createRoutes()
})

export default router
