// lib's
const body = require('koa-body')
const fs = require('fs')
const helmet = require('koa-helmet')
const http = require('http')
const loggerKoa = require('koa-logger')

// helpers
const logger = require('./app/helpers/logger')

// config
const port = require('./app/config/api').port

// middlewares
const jwt = require('./app/middlewares/jwt')
const compress = require('./app/middlewares/compress')
const cors = require('./app/middlewares/cors')

// acl and routes
const acl = require('./app/acl')
const routes = require('./app/routes')

// start koa
const Koa = require('koa')
let app = new Koa()

// start middlewares
app.use(body())
app.use(helmet())
app.use(loggerKoa())
app.use(cors.corsError)
app.use(cors.cors)
app.use(compress)

// start acl and routes
acl.init()
routes(app, jwt)

// start api
http.createServer(app.callback()).listen(port.http, () => {
  logger.log(`Server listening at http://localhost:${port.http}/api/`)
})

module.exports = app