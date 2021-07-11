
module.exports = (app, router, { Article }, { f, mongoose }) => {
    try {

        router.post('/saveArticle', async (req, res, next) => {

           
            let postData = req.body, id = postData._id
            delete postData._id
            console.log('postData===>', postData)
            
            if (mongoose.Types.ObjectId.isValid(id)) {
                
                const Query = await Article.findByIdAndUpdate(id, {
                    ...postData,
                    updatedTime: + new Date(),
                    picUrl: postData.extraImgLink
                }, {
                    new : true
                })
                console.log('修改后query===>', Query)
                f(res, '0000', '', {
                    isOk: true
                })
            } else {
                postData = { ...postData, ...{
                    createTime: + new Date(),
                    year: new Date().getFullYear()
                }}
                
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
            }
        })

        router.post('/deleteArticle', async (req, res) => {
            const postData = req.body
            console.log('删除文章__postData===>', postData)
            if (postData.id && mongoose.Types.ObjectId.isValid(postData.id)) {
                const ret = await Article.findByIdAndDelete(postData.id)
                
                if (ret && ret._id == postData.id) {
                    f(res, '0000', '删除成功', {
                        isOk: true
                    })
                } else {
                    f(res, '9999', '删除失败')
                }
            }
            
        })

        router.post('updateArticle', async (req, res) => {

        })

        router.post('/findArticle', async (req, res) => {
            const [ total, articleDocs ] = await Promise.all([ Article.countDocuments(), Article.find() ])
            // console.log('web/article---articleDocs===>', articleDocs)
            // console.log('web/article---total===>', total)

            if (articleDocs.length) {
                f(res, '0000', '', {
                    totalCount: total,
                    articleList: articleDocs
                })
            } else {
                f (res, '0000', '')
            }
        })

    } catch (error) {
        console.log('error===>', error)
        f(res, '0000', error)
    }

    app.use('/admin', router)

}
