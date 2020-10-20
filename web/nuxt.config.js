
const meta = require('./config/meta')
const projectConfig = require('./config/project')
export default {
    build: {
        analyze: true
    },
    buildDir: './dist',
    ssr: false,
    router: {
        extendRoutes (routes, resolve) {
            console.log(routes)
            for (let i = routes.length; i--;) {
                routes[i].path = routes[i].path + '.html'
            }
        }
    },
    target: 'server',
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
    plugins: [],
    components: true,
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {}
}
