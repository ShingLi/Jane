/* licheng 服务端中间件 
-------------------------- */
const path = require('path')
const fs = require('fs')

const dir = src => path.join(process.cwd(), src)

const server =  function (req, res, next) {
    
    if (process.env.NODE_ENV == 'development') {

        let originalUrl = req.originalUrl.includes('/web') ? req.originalUrl : ''
        
        if (originalUrl) {
            
            fs.readFile(dir('servermock' + originalUrl + '.json'), 'utf-8', (err, data) => {
                if (err) {
                    console.log(new Error('读取失败'))
                    process.exit(0)
                }
                res.setHeader('Content-Type', 'application/json;charset=utf-8')
                res.end(data, 'utf-8')
            })

        } else {
            next()
        }
    }
}

export default server