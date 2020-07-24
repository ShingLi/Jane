const express = require('express')
const router = express.Router()

module.exports = (app) => {
    router.post('/login', (req, res, next) => {
        // 登录
    })
    app.use('/admin', router)
}