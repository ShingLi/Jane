module.exports = (app, router, { Article }, { f }) => {

    router.post('/findArticle', async (req, res) => {
        
        try {
            const [ total, articleDocs ] = await Promise.all([ Article.countDocuments(), Article.find() ])
            console.log('web/findArticle---articleDocs===>', articleDocs)
            console.log('web/findArticle---total===>', total)

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
            console.log('web/getArticle---params===>', params)
            if (params.id) {
                const articleDoc = await Article.findById(params.id)
                console.log('web/getArticle---articleDoc', articleDoc)
                f(res, '0000', '', articleDoc)
            } else {
                res.status(422)
                f(res, '9999', '参数丢失', {
                    isOk: false,
                    errMsg: '参数丢失'
                })
            }
        } catch (error) {
            f(res, '9999', '', error)
        }
        
    })

    router.post('/like', async (req, res) => {
        const postData = req.body
        console.log('web/like---postData==>', postData)

        const Query = await Article.findByIdAndUpdate(postData._id, {
            $inc: { likeNum: postData.num }
        }, {
            new: true
        })
        console.log('/like/query===>', Query)
        if (Query) {
            f(res, '0000', '', {
                isOk: true,
                likeNum: Query.likeNum
            })
        }
    })

    app.use('/web', router)

}
