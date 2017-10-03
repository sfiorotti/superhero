const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'auth'
const controller = require(`./${baseUrl}.controller`)

const createRoutes = (jwt) => {
    let router = new Router()

    router.prefix(`/${prefix}/${baseUrl}`)

    // 15. Authenticate to the api
    router.post('/', controller.token)
    
    return router
}

module.exports = (jwt) => createRoutes(jwt)