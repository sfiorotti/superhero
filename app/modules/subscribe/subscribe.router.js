const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'subscribe'
const controller = require(`./${baseUrl}.controller`)

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)

    // 16. Subscribe to Audit (better detailed in the audit section)
    router.get('/', controller.subscribe)

    router.post('/send/', controller.send)

    return router
}

module.exports = (jwt) => createRoutes(jwt)