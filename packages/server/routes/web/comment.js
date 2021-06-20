const mongoose = require('mongoose')
module.exports = (app, router, { Comment }, { f }) => {
    /*  文章提交评论
    -------------------------- */
    router.post('/submitComment', async (req, res) => {
        const postData = req.body
        console.log('web/comment---postData===>', postData)
        if (Object.keys(postData).length) {
            const id = postData.articleId
            Comment.create({
                comment_blog_id: id,
                comment_create_time: + new Date(),
                comment_user_name: postData.uname,
                comment_user_email: postData.uemail,
                comment_user_id: '',
                comment_user_avatar: '',
                comment_user_ip: req.ip,
                comment_user_content: postData.content
            }, async (err, doc) => {
                if (err) {
                    let message, { errors } = err
                    for (let k in errors) {
                        if (errors.hasOwnProperty(k)) {
                            if (errors[k].message) {
                                message = errors[k].message
                                break
                            }
                        }
                    }
                    f(res, '9999', message)
                } else {
                    f(res, '0000', '评论成功~~', {
                        isOk: true
                    })
                }
            })
        } else {
            res.status(422)
            f(res, '9999', '')
        }
    })
    /*  获取文章评论
    -------------------------- */
    router.get('/getComment', async (req, res) => {
        
        const id = req.query.articleId || ''
        try {
            const DOCS  = await Comment.find(
                { comment_blog_id: mongoose.Types.ObjectId(id) },
                null,
                { sort: { comment_create_time: -1 } }
            )
            f(res,'0000', '', {
                commentList: DOCS,
            })
        } catch (error) {
            f(res, '9999', error) 
        }
        
    })
    /*  
    -------------------------- */
    app.use('/web', router)

}
