const express = require('express')
const router = express.Router()

let postData

const parsebody = (req) => {
	return new Promise((resolve, reject) => {
		postData = ''
		try {
			req.on('data', data => {
				postData += data
			})
			req.on('end', ()=> {
				return resolve(postData)
			})
		} catch (error) {
			return reject(error)
		}
	})
}
module.exports = (app, { User }) => {
	
	router.post('/login', async(req, res) => {
		await parsebody(req)
		console.log('登录账号数据', postData)
		const info = {
			username: postData.username,
			password: postData.password
		}
		User.find(info, (err, doc) => {
			console.log('用户查询', doc)
			if (err) {
				res.json({
					responseCode: "9999",
					responseMsg: "查询错误"
				})
			} else{
				if (!doc.length) {
					res.json({
						responseCode: "9999",
						responseMsg: "账号不存在!"
					})
				}
			}
		})
	})

	router.post('/signup', async(req, res) => {
		await parsebody(req)
		console.log('注册账号数据', postData)
		res.send({

		})
	})
	app.use('/admin', router)
}