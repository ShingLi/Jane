const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: Number,
		min: [1, '最小一位'],
		max: [6, '最多六位'],
		required: true
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (val) {
				return 
			},
			message: '密码太短'
		}
	}
})

module.exports = mongoose.model('user', userSchema)