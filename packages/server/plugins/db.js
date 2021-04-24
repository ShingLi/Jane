const mongoose = require('mongoose')
const consola = require('consola')

module.exports = () => {
	mongoose.connect('mongodb://127.0.0.1/runoob', { 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 1000,
		keepAlive: 120,
		bufferCommands: false,
	}).then(
		() => {
			consola.success('~连接数据库成功～')
		},
		err => {
		}
	)
}
