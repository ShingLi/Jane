
const f = (res, code, message, responseData = []) => {
    const Obj = {
        responseCode: code,
        responseMsg: message,
        responseData: responseData
    }
    res.json(Obj)
}
module.exports = (app, router, { Index }) => {

    /*  admin web保存
    -------------------------- */
    router.post('/saveIndex', async (req, res) => {
        
        const postData =  req.body

        console.log('postData ===> ', postData)

        if (!Object.keys(postData).length) {
            res.status(422)
            f(res, 422, '参数丢失')
        } else {
            Index.create({
                ...postData
            }, async (err, doc) => {
                if (err) {
                    f(res, '9999', err)
                } else {
                    f(res, '0000', '保存成功')
                }
            })
        }
    })

    /*  web  首页查询
    -------------------------- */
    router.post('/index', async (req, res) => {

        // 先查询数据库是否有数据
        const DOCS = await Index.find()



        res.json({
            res: '00000'
        })
    })

    app.use('/web', router)

}
