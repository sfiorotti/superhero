const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'audit'
const controller = require(`./${baseUrl}.controller`)

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)
    router = new (require('../../common/routerCommon'))(controller, router, jwt)

    return router
}

module.exports = (jwt) => createRoutes(jwt)