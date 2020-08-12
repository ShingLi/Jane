const express = require('express')
const fs = require('fs')
const http = require('http')

const cors = require('cors')
const expressJWT = require('express-jwt')

const app = express()
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

app.use(cors())
app.use(expressJWT({
	secret: 'jane',
	algorithms: ['RS256']
}).unless({
	path: ['/admin/signup']
}))

const presetdir = ['models', 'plugins']
const routesdir = __dirname + '/routes'

const global = fs.readdirSync(__dirname, 'utf-8').filter((dir) => presetdir.includes(dir)).reduce((total, cur) => {
	fs.readdirSync(`${__dirname}/${cur}`, 'utf-8').map(item => {
		let name = item.replace(/.\js/, '')
		if (cur === 'models') name = name.replace(/\S/, s => s.toUpperCase())
		total[cur][name] = require(`${__dirname}/${cur}/${name}`)
	})
	return total
}, { plugins: {}, models: {} })

fs.readdirSync(routesdir, 'utf-8').forEach(dir => {
	dir = routesdir + '/' + dir
	if (fs.statSync(dir).isDirectory()) {
		fs.readdirSync(dir).forEach(route => {
			route = route.replace(/\.js$/, '')
			require(`${dir}/${route}`)(app, global['models'])
		})
	}
})

require('./plugins/db')()
http.createServer(app).listen(port, () => {
	console.log(`serve running ${host}:${port}`)
})