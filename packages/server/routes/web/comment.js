module.exports = (app, router, { Comment }, { f }) => {
    /*  
    -------------------------- */
    router.post('/submitComment', async (req, res) => {
        const postData = req.body
        console.log('web/comment---postData===>', postData)
        if (Object.keys(postData).length) {
            const id = postData.articleId
            const DOC = await Comment.findById(id) || []
            console.log('web/comment---DOC===>', DOC)
            if (DOC.length) {
                
            } else {
                Comment.create({
                    id: postData.articleId,
                    createTime: + new Date(),
                    uname: postData.uname,
                    content: postData.content
                }, async (err, doc) => {
                    if (err) {
                        f(res, '9999', '', err)
                    } else {
                        f(res, '0000', '', {
                            isOk: true
                        })
                    }
                })
            }
        } else {
            res.status(422)
            f(res, '9999', '')
        }
    })
    /*  
    -------------------------- */
    app.use('/web', router)

}
