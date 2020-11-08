/* licheng 全局head
-------------------------- */
const globalHead = {
    meat: [
        {
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: process.env.npm_package_description || 'shingli的web页面'
        }
    ],
    htmlAttrs: {
        lang: 'ZH-CN'
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
