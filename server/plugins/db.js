const mongoose = require('mongoose')

module.exports = () => {
	mongoose.connect('mongodb://127.0.0.1/runoob', { 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 1000,
		keepAlive: 120,
		bufferCommands: false,
	}).then(
		() => {
			console.log('~连接数据库成功～')
		},
		err => {
			console.error(err || '~连接数据库失败～')
		}
	)
}
