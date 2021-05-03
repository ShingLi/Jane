const fs = require('fs-extra')
const path = require('path')

const server = async (app, server) => {
    app.post('*/admin/*', async (req, res) => {
        // 这里只在dev环境下作用
        if (process.env.NODE_ENV == 'development') {
            const baseUrl = req.originalUrl.slice(1), reqUrl = path.resolve(__dirname, baseUrl + '.json')
            
            const exists = await fs.pathExists(reqUrl)
            
            if (exists) {
                const data = await fs.readJSON(reqUrl)
                res.send(data)
            }
        }
    })
}

module.exports = server