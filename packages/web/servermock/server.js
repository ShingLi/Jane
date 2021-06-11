/* licheng 服务端中间件 
-------------------------- */
const path = require('path')
const fs = require('fs')

const dir = src => path.join(process.cwd(), src)

const server =  function (req, res, next) {
    console.log('servermock.js--NODE_ENV===', process.env.NODE_ENV)
    // 开发环境走本地json
    if (process.env.NODE_ENV == 'development') {

        let originalUrl = req.originalUrl.includes('/web') ? req.originalUrl : ''
        
        if (originalUrl) {
            
            fs.readFile(dir('servermock' + originalUrl + '.json'), 'utf-8', (err, data) => {
                if (err) {
                    console.log('err === >', err)
                    console.log(new Error('读取失败'))
                    process.exit(0)
                }
                res.setHeader('Content-Type', 'application/json;charset=utf-8')
                res.end(data, 'utf-8')
            })

        } else {
            next()
        }
    } else next()
}

export default server