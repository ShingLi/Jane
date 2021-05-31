
module.exports = (app, router, { Upload }) => {

    router.post('/userInfo', async (req, res) => {
        res.json({
            responseCode: '0000',
            responseMsg: '',
            responseData: {
                roles: 'Jane'
            }
        })
    })

    app.use('/admin', router)
}