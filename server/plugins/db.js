const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/runoob', { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

module.exports = () => {
	console.log('执行')
	const db = mongoose.connection

	db.on('error', console.error.bind(console, '连接数据库失败'))

	db.on('open', () => {
		console.log('~连接数据库成功～')
	})
}
