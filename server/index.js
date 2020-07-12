const express = require('express')
const http = require('http')
const fs = require('fs')

const app = express()
const port = process.env.PORT || '9000'
const host = process.env.HOST || 'localhost'

const routesDir = `${__dirname}/routes`

fs.readdirSync(routesDir, 'utf-8').forEach(fileDir => {
    let routesPath = `${routesDir}/${fileDir}`
    if (fs.statSync(routesPath).isDirectory()) {
        fs.readdirSync(routesPath).forEach(router => {
            require(`${routesPath}/${router}`)(app)
        })
    }
})

http.createServer(app).listen(port, () => {
    console.log(`Server listening on http://${host}:${port}`)
})