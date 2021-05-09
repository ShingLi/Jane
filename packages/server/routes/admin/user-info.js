import multer from 'multer'
import fse from 'fs-extra'

const upload = multer({
	storage: function (req, file, cb) {
        console.log('上传文件--stroage__req', req)
        console.log('上传文件--stroage', file)
        const uploadDir = '../../public/assets/images/upload'

        fse.ensureDir(uploadDir, err => {
            if (err) {
                throw new Error('创建文件夹失败')
            } else {
                cb(null, uploadDir)
            }
        })
	},
	storage: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
	}
})

module.exports = (app, router) => {

    router.post('/userInfo', async (req, res) => {
        res.json({
            responseCode: '0000',
            responseMsg: ''
        })
    })

    /*  上传头像
    -------------------------- */
    router.post('/upload', upload.single('janeAvatar'), async (req, res, next) => {
        console.log('上传头像--req__file', req.file)
        res.send({
            responseCode: '0000'
        })
    })

    app.use('/admin', router)
}