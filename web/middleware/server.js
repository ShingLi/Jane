/* licheng 服务端中间件  https://nuxtjs.org/docs/2.x/concepts/nuxt-lifecycle#server
-------------------------- */
const path = require('path')
const fs = require('fs')

const dir = path.join('/servermock/web', process.cwd())

const server =  function (req, res, next) {
    if (process.env.NODE_ENV == 'development') {
        let originalUrl = req.originalUrl.includes('/web') ? req.originalUrl : ''
        const file = fs.readdirSync(dir, {
            encoding: 'utf-8',
            withFileTypes: true
        })
        console.log(file)
        
    }
    next()
}

export default server