

module.exports = (app, router, { Index }, { f }) => {

    /*  admin web保存
    -------------------------- */
    router.post('/saveIndex', async (req, res) => {
        
        const postData =  req.body

        console.log('postData ===> ', JSON.stringify(postData, null, 4))

        if (!Object.keys(postData).length) {
            res.status(422)
            f(res, 422, '参数丢失')
        } else {
            // 创建并修改
            Index.findOneAndUpdate(
                {
                    id: 1
                },
                {
                    ...postData
                },
                {
                    new: true,
                    upsert: true
                },
                async (err, doc) => {
                    console.log('err ===>', err)
                    console.log('doc ===>', doc)

                    if (err) {
                        f(res, '9999', err)
                    } else {
                        f(res, '0000', '保存成功', { isOk: true })
                    }
                }
            )
        }
    })

    /*  web  首页查询
    -------------------------- */
    router.post('/index', async (req, res) => {

        const doc = await Index.findOne()
        console.log('doc ===>', doc)
        if (doc) {
            f(res, '0000', '', { 
                ICPNumber: doc.ICPNumber,
                ICPwebsit: doc.ICPwebsit,
                IndexDesc: doc.IndexDesc
            })
        } else {
            res.end()
        }
    })

    app.use('/web', router)

}
