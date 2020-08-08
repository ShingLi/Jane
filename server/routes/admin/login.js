const express = require('express')
const router = express.Router()

module.exports = (app, { User }) => {
	let postData = ''

	router.post('/login', async(req, res) => {
		req.on('data', data => {
			postData += data
		})
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

	router.post('/sinup', async(req, res) => {

	})
	app.use('/admin', router)
}