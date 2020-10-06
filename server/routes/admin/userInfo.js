module.exports = (app, router) => {

    router.post('/userinfo', async (req, res) => {
        console.log(req.body)
    })

    app.use('/admin', router)
}