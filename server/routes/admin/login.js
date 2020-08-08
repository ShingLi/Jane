const express = require('express')
const router = express.Router()

module.exports = (app, { User }) => {
	console.log(User)
	let postData = ''
	router.post('/login', async (req, res) => {
		req.on('data', data => {
			postData += data
		})
		const info = {
			username: postData.username,
			password: postData.password
		}
		
		
	})
	app.use('/admin', router)
}