module.exports = (app, router) => {

    router.post('/userInfo', async (req, res) => {
        res.json({
            responseCode: '0000',
            responseMsg: ''
        })
    })

    app.use('/admin', router)
}