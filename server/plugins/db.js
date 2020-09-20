const mongoose = require('mongoose')

module.exports = () => {
	mongoose.connect('mongodb://127.0.0.1/runoob', { 
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(
		() => {
			console.log('~连接数据库成功～')
		},
		err => {
			console.error.bind(console, err || '连接数据库失败')
		}
	)
}
