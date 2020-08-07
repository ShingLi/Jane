const express = require('express')
const fs = require('fs')
const http = require('http')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

app.use(cors())

const presetdir = ['models', 'plugins']
const routesdir = __dirname + '/routes'

const global = fs.readdirSync(__dirname, 'utf-8').filter((dir) => presetdir.includes(dir)).reduce((total, cur) => {
	fs.readdirSync(`${__dirname}/${cur}`, 'utf-8').map(item => {
		let name = item.replace(/.\js/, '')
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