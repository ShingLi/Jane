
const meta = require('./config/meta')
const projectConfig = require('./config/project')
export default {
    build: {
        analyze: true, // 编译的时候显示构建包的大小 // https://zh.nuxtjs.org/api/configuration-build/
    },
    buildDir: './dist',
    // ssr: false,
    router: {
        extendRoutes (routes, resolve) {
            for (let i = routes.length; i--;) {
                routes[i].path = routes[i].path + '.html'
            }
        }
    },
    target: 'server', // default server
    head: {
        title: process.env.npm_package_name || projectConfig.title,
        meta,
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    css: [],
    plugins: [
        '~/plugins/axios'
    ],
    components: true, // 2.13+ // 自动注册组件 https://github.com/nuxt/components
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {

    }
}
