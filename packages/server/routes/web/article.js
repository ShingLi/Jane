module.exports = (app, router, { Article }, { f }) => {

    router.post('/findArticle', async (req, res) => {
        
        try {
            const [ total, articleDocs ] = await Promise.all([ Article.countDocuments(), Article.find() ])
            console.log('web/article---articleDocs===>', articleDocs)
            console.log('web/article---total===>', total)

            if (articleDocs.length) {
                f(res, '0000', '', {
                    totalCount: total,
                    articleList: articleDocs
                })
            } else {
                f (res, '0000', '')
            }
        } catch (error) {
            console.log('error===>', error)
            f(res, '0000', error)
        }
    })

    router.get('/getArticle', async (req, res) => {

        try {
            const params = req.query
            console.log('web/article---params===>', params)
            if (params.id) {
                const articleDoc = await Article.findById(params.id)
                console.log('web/article---articleDoc', articleDoc)
                f(res, '0000', '', articleDoc)
            } else {
                res.status(422)
                f(res, '9999', '参数丢失', {
                    isOk: false,
                    errMsg: '参数丢失'
                })
            }
        } catch (error) {
            f(res, '9999', '', err)
        }
    })

    app.use('/web', router)

}
