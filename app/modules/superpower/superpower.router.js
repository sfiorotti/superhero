const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'superpower'
const controller = require(`./${baseUrl}.controller`)

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)

    // 6. Paginated List of SuperPowers
    router.post('/:paginate/:limit', jwt, async (ctx, next) => controller.find(ctx, next))
    // 7. Create SuperPower
    router.post('/create', jwt, async (ctx, next) => controller.save(ctx, next))
    // 8. Update SuperPower
    router.patch('/:id', jwt, async (ctx, next) => controller.update(ctx, next))
    // 9. Delete SuperPower with 9a
    router.del('/:id', jwt, async (ctx, next) => controller.remove(ctx, next))
    // 10. View single SuperPower
    router.get('/:id', jwt, async (ctx, next) => controller.findById(ctx, next))

    return router
}

module.exports = (jwt) => createRoutes(jwt)