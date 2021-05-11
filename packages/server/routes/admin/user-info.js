import multer from 'multer'
import fse from 'fs-extra'
import path from 'path'
import consola from 'consola'


const upload = multer({
	storage: multer.diskStorage({
        destination: (req, file, cb) => {
            
            console.log('上传文件--stroage', file)
            const uploadDir = path.join(__dirname, '../../', 'public/assets/images/upload')
    
            fse.ensureDir(uploadDir, err => {
                if (err) {
                    throw new Error('创建文件夹失败')
                } else {
                    cb(null, uploadDir)
                }
            })
        },
        filename: (req, file, cb) => {
            // 这里应该要加一个时间戳的
            cb(null, file.originalname)
        }
    })
})

module.exports = (app, router, { Upload }) => {

    /*  用户信息
    -------------------------- */
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
        const IMG = new Upload({
            filename: req.file.filename,
            imgUrl: req.file.path
        })
        IMG.save((err, img) => {
            if (err) {
                consola.error(err)
            }else {
                res.send({
                    responseCode: '0000',
                    responseData: {
                        imgUrl: req.file.path
                    }
                })
            }
        })
    })

    app.use('/admin', router)
}