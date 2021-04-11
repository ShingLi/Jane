/* licheng 全局head
-------------------------- */
const globalHead = {
    meta: [
        {
            charset: 'utf-8'
        },
        {
            name: 'Jane',
            content: '喜欢小珍珍~~~~'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: process.env.npm_package_description || 'shingli的web页面'
        },
        {
            hid: 'keywords',
            name: 'keywords',
            content: 'nuxt, nuxtjs, 博客'
        },
        {
            hid: 'siteapp',
            content: 'no-siteapp',
            'http-equiv': 'Cache-Control', // 防止Baidu转码增加广告
        },
        {
            hid: 'renderer',
            name: 'renderer',
            content: 'webkit', // 国产双核浏览器
        },
        {
            hid: 'google',
            name: 'google',
            value: 'notranslate'
        }
    ],
    htmlAttrs: {
        lang: 'zh-cmn-Hans'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }
    ],
    __dangerouslyDisableSanitizers: ['script'],
}

module.exports = globalHead
