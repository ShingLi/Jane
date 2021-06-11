module.exports = (app, router, { Article }) => {

    router.post('/saveArticle', async (req, res, next) => {

        const postData = req.body ? Object.assign({}, req.body, {
            createTime: + new Date(),
        }) : req.body

        console.log('postData---', postData)

        Article.create({
            ...postData
        }, (err, doc) => {
            if (doc) {
                res.json({
                    responseCode: '0000',
                    responseMsg: '保存成功',
                    responseData: {
                        isOk: true
                    }
                })
            } else {
                if (!Object.keys(postData).length) {
                    res.status(422).json({
                        responseCode: '9999',
                        responseMsg: err.message
                    })
                } else {
                    res.status(500).json({
                        responseCode: '9999',
                        responseMsg: err
                    })
                }
                
            }
        })
    })

    router.post('deleteArticle', async (req, res) => {

    })

    router.post('updateArticle', async (req, res) => {

    })
    
    app.use('/admin', router)

}
