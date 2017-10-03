const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'user'
const controller = require(`./${baseUrl}.controller`)

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)

    // 11. Paginated List of Users
    router.post('/:paginate/:limit', jwt, async (ctx, next) => controller.find(ctx, next))
    // 12. Create User
    router.post('/create', jwt, async (ctx, next) => controller.save(ctx, next))
    // 13. Update User
    router.patch('/:id', jwt, async (ctx, next) => controller.update(ctx, next))
    // 14. Delete User
    router.del('/:id', jwt, async (ctx, next) => controller.remove(ctx, next))

    return router
}

module.exports = (jwt) => createRoutes(jwt)