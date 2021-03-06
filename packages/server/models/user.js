const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	account: {
		type: String,
		required: [ true, '用户名不能为空!'],
		validate: {
			validator: username => {
				return username.length >= 1
			},
			message: `用户名最少1位!`
		}
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: pwd => {
				return pwd.length > 6
			},
			message: '密码不少于6位!'
		}
	},
	avatar: {
		type: String,
	},
	username: {
		type: String
	}
})

module.exports = mongoose.model('user', userSchema)