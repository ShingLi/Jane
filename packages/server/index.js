const fs = require('fs')
const http = require('http')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressJWT = require('express-jwt')

const app = express()
const router = express.Router()
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

app.use(cors())
app.use(bodyParser.json())

// 验证token
app.use(expressJWT({
	secret: 'jane', // 密钥
	algorithms: ['HS256'], // 算法 rs256 有问题 https://stackoverflow.com/questions/39874731/unauthorizederror-invalid-algorithm-express-jwt
}).unless({
	path: ['/admin/login', '/admin/signup'], // 不经过Token 解析
}))

// token 错误自定义 和 token 过期自动刷新
app.use((err, req, res, next) => {
	if (err.name == 'UnauthorizedError') {
		res.status(401).send({
			responseCode: '5015',
			responseMsg: 'token失效'
		})
	} else {
		// 活跃用户token过期无感刷新
		next()
	}
})


const presetdir = ['models', 'plugins']
const routesdir = __dirname + '/routes'

const global = fs.readdirSync(__dirname, 'utf-8').filter((dir) => presetdir.includes(dir)).reduce((total, cur) => {
	fs.readdirSync(`${__dirname}/${cur}`, 'utf-8').map(item => {
		if (/\.js/.test(item)) {
			let name = item.replace(/.\js/, '')
			if (cur === 'models') name = name.replace(/\S/, s => s.toUpperCase())
			total[cur][name] = require(`${__dirname}/${cur}/${name}`)
		}
	})
	return total
}, { plugins: {}, models: {} })

fs.readdirSync(routesdir, 'utf-8').forEach(dir => {
	dir = routesdir + '/' + dir
	if (fs.statSync(dir).isDirectory()) {
		fs.readdirSync(dir).forEach(route => {
			route = route.replace(/\.js$/, '')
			require(`${dir}/${route}`)(app, router, global['models'])
		})
	}
})

require('./plugins/db')()

http.createServer(app).listen(port, () => {
	console.log(`serve running ${host}:${port} at pid ${process.pid}`)
})