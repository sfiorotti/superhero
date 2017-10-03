const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'superpower'
const controller = require(`./${baseUrl}.controller`)

const acl = require('../../middlewares/acl')

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)

    // 6. Paginated List of SuperPowers
    router.post('/:paginate/:limit', jwt, acl.superPowerList, controller.find)
    // 7. Create SuperPower
    router.post('/create', jwt, acl.superPowerCreate, controller.save)
    // 8. Update SuperPower
    router.patch('/:id', jwt, acl.superPowerUpdate, controller.update)
    // 9. Delete SuperPower with 9a
    router.del('/:id', jwt, acl.superPowerDelete, controller.remove)
    // 10. View single SuperPower
    router.get('/:id', jwt, acl.superPowerView, controller.findById)

    return router
}

module.exports = (jwt) => createRoutes(jwt)