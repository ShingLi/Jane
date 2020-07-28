const express = require('express')
const fs = require('fs')
const http = require('http')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

app.use(cors())

const routesdir = __dirname + '/routes'

fs.readdirSync(routesdir, 'utf-8').forEach(dir => {
	dir = routesdir + '/' + dir
	if (fs.statSync(dir).isDirectory()) {
		fs.readdirSync(dir).forEach(route => {
			route = route.replace(/\.js$/, '')
			require(`${dir}/${route}`)(app)
		})
	}
})

http.createServer(app).listen(port, () => {
	console.log(`serve running ${host}:${port}`)
})