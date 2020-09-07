const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: Number,
		required: [ true, '密码不能为为空'],
		validate: {
			validator: username => {
				return (username + '').length > 2
			},
			message: '密码长度太多，最少2位'
		}
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: pwd => {
				return (pwd + '').length > 6
			},
			message: '密码为6位数字'
		}
	}
})

module.exports = mongoose.model('user', userSchema)