const jwt = require('jsonwebtoken')

let postData

const parsebody = (req) => {
	// 原生解析post 请求
	return new Promise((resolve, reject) => {
		postData = ''
		try {
			req.on('data', data => {
				postData += data
			})
			req.on('end', ()=> {
				postData = JSON.parse(postData)
				return resolve(postData)
			})
		} catch (error) {
			return reject(error)
		}
	})
}

module.exports = (app, router, { User }) => {

	router.post('/login', async(req, res) => {
		const { account, password } = req.body
		const info = {
			account,
			password
		}
		console.log('登录账号数据', info)
		// 生成token
		const token = jwt.sign(info, 'jane', {
			issuer: 'shingli',
			expiresIn: '30m', // 过期时间30分钟
		})
		
		User.find(info, (err, doc) => {
			console.log('用户查询--doc', doc)
			console.log('用户查询--err')
			if (err) {
				res.json({
					responseCode: "9999",
					responseMsg: "查询错误",
				})
			} else{
				if (!doc.length) {
					res.json({
						responseCode: '9999',
						responseMsg: '账号不存在!',
					})
				} else {
					res.json({
						responseCode: '0000',
						responseMsg: '登录成功',
						token
					})
				}
			}
		})
	})

	router.post('/signup', async(req, res) => {
		const { account, password } = req.body
		const len = await User.find().countDocuments()
		if (len) {
			res.send({
				responseCode: '9999',
				responseMsg: '请勿重复注册',
			})
		} else {
			const info = {
				account,
				password,
			}

			User.create(info, (err, doc) => {
				if (doc) {
					res.json({
						responseCode: '0000',
						responseMsg: '注册成功',
					})
				} else {
					let message, { errors } = err
					for (let k in errors) {
						if (errors.hasOwnProperty(k)) {
							if (errors[k].message) {
								message = errors[k].message
								break
							}
						}
					}
					res.json({
						responseCode: '9999',
						responseMsg: message
					})
				}
			})
		}
	})

	app.use('/admin', router)

}
