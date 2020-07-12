const express = require('express')
const router = express.Router()

module.exports = (app) => {
    app.get('/user/:id', function (req, res, next) {
        if (req.params.id == '0') next('route')
        else next()
    }, function (req, res, next) {
        res.send('regular')
        // next()
        console.log(2222222)
    })

    console.log(1111)
    
    app.get('/user/:id', function (req, res, next) {
        console.log(333)
        res.send('special')
    })
}