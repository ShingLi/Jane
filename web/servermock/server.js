/* licheng 服务端中间件 
-------------------------- */
const path = require('path')
const fs = require('fs')

const dir = path.join(process.cwd(),'/servermock/web')

const server =  function (req, res, next) {
    
    if (process.env.NODE_ENV == 'development') {

        let originalUrl = req.originalUrl.includes('/web') ? req.originalUrl : ''
        const file = fs.readdirSync(dir, {
            encoding: 'utf-8',
            withFileTypes: true
        })
        
        console.log(1)
    }
    next()
}

export default server