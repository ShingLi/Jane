const express = require('express')
const router = express.Router()

module.exports = (app) => {
	let postData = ''
	router.post('/login', async (req, res) => {
		req.on('data', data => {
			postData += data
		})
		console.log(postData)
		
	})
	app.use('/admin', router)
}