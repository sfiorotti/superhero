// lib's
const body = require('koa-body')
const fs = require('fs')
const helmet = require('koa-helmet')
const http = require('http')
const logger = require('./app/helpers/logger')
const loggerKoa = require('koa-logger')

// config
const port = require('./app/config/api').port

// middlewares
const jwt = require('./app/middlewares/jwt')
const compress = require('./app/middlewares/compress')
const cors = require('./app/middlewares/cors')

// models and routes
const models = require('./app/models')
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

// start models and routes
models.init()
routes(app, jwt)

// start api
http.createServer(app.callback()).listen(port.http, () => {
  logger.log(`Server listening at http://localhost:${port.http}/api/`)
})

module.exports = app