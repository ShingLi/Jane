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
		console.log('登录账号数据---', info)
		// 生成token
		const token = jwt.sign(info, 'jane', {
			issuer: 'shingli',
			expiresIn: '30m', // 过期时间10分钟
		})
		
		User.find(info, (err, doc) => {
			console.log('用户查询---user', doc)
			console.log('用户查询---err', err)
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
						responseData: {
							token
						}
					})
				}
			}
		})
	})

	router.post('/signup', async(req, res) => {
		const { account, password } = req.body

		const info = {
			account,
			password,
			admin: false,
		}

		const namespace = [ 'jane' ]

		if (typeof account == 'string' && namespace.includes(account.toLowerCase())) {
			// 管理员
			info.admin = true
		}

		let len = await User.find({ admin: false }).countDocuments(),
			count = 1

		if (info.admin) {
			len = await User.find({ admin: true }).countDocuments()
			count = namespace.length
		}

		console.log('注册账号前账号数---', len)

		if (len == count) {

			res.send({
				responseCode: '9999',
				responseMsg: '请勿重复注册',
			})

		} else {
			
			User.create(info, (err, doc) => {
				if (err) {
					
					return res.status(500).json({
						error: err.message
					})
				}
				if (doc) {

					console.log('注册成功后账号数---', len + 1)
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
