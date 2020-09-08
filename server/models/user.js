const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: Number,
		min: [2, '最少一位'],
		max: [6, '最多六位'],
		required: true
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (val) {
				return val
			},
			message: '密码太短'
		}
	}
})

module.exports = mongoose.model('user', userSchema)