import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/layout'

Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('views/login/login')
    },
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [
            {
                name: 'index',
                path: 'index',
                component: () => import('views/index/index')
            }
        ]
    },
]

export const asyncRoutes = []

const createRoutes = () => constantRoutes

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: createRoutes()
})

export default router
