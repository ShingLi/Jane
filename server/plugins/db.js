const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/runoob')

const userSchema = mongoose.Schema({
	username: String,
	password: String
})

const user = mongoose.model('user', userSchema)

module.exports = () => {
	const db = mongoose.connection

	db.on('error', console.error.bind(console, '连接数据库失败'))

	db.on('open', () => {
		console.log('~连接数据库成功～')
	})
}
