const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'help'
const controller = require(`./${baseUrl}.controller`)

const acl = require('../../middlewares/acl')

const createRoutes = (jwt) => {
    let router = new Router()

    router.prefix(`/${prefix}/${baseUrl}`)

    /* 17. [BONUS] Help Me endpoint: send a location (latitude and longitude) 
    and find up to 8 closest superheroes (in a 10km radius) */
    router.post('/', jwt, acl.helpMe, controller.help)
    
    return router
}

module.exports = (jwt) => createRoutes(jwt)