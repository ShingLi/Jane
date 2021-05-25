import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/layout'

Vue.use(VueRouter)

// 通用路由
export const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('views/login/login'),
        meta: {
            title: '一片云'
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [
            {
                name: 'Index',
                path: 'index',
                component: () => import('views/index/index'),
                meta: {
                    title: '首页'
                }
            }
        ]
    },
    {
        path: '/article',
        component: Layout,
        children: [
            {
                name: 'Article',
                path: '/article',
                component: () => import('views/article/article'),
                meta: {
                    title: '文章'
                }
            }
        ]
    },
    {
        path: '/web',
        component: Layout,
        children: [
            {
                name: 'Web',
                path: '/web',
                component: () => import('views/web/web'),
                meta: {
                    title: 'web'
                }
            }
        ]
    },
    {
        path: '/set',
        component: Layout,
        children: [
            {
                name: 'Set',
                path: '/set',
                component: () => import('views/set/set'),
                meta: {
                    title: '设置'
                }
            }
        ]
    },
    {
        path: '*',
        component: () => import('views/404/404')
    }
]

// 动态挂载路由需要权限的账号才能访问的
export const asyncRoutes = [
    // {
    //     path: '/layout',
    //     component: Layout,
    //     children: [
    //         {
    //             name: 'Setting',
    //             path: 'setting',
    //             component: () => import('views/setting/setting')
    //         }
    //     ]

    // }
]

const createRoutes = () => constantRoutes

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: createRoutes()
})

export default router
