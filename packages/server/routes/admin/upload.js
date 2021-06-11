import multer from 'multer'
import fse from 'fs-extra'
import path from 'path'
import consola from 'consola'


const domain = `//${process.env.HOST}:${process.env.PORT}`

const presetDir = 'public/assets/images/upload'

const upload = multer({
	storage: multer.diskStorage({
        destination: (req, file, cb) => {
            
            const uploadDir = path.join(__dirname, '../../', presetDir)
    
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

    /*  admin--上传
    -------------------------- */
    router.post('/upload', upload.single('janeAvatar'), async (req, res, next) => {
        console.log('上传头像--req__file', req.file)

        const IMG = new Upload({
            filename: req.file.filename, // *./jpe?g/
            imgUrl: req.file.path
        })


        IMG.save((err, img) => {
            if (err) {
                consola.error(err)
                res.json({
                    responseCode: "9999",
                    responseMsg: err
                })
            } else {
                res.send({
                    responseCode: '0000',
                    responseData: {
                        imgUrl: `${domain}/${presetDir}/${req.file.filename}`
                    }
                })
            }
        })
    })

    app.use('/admin', router)

}
