const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'superhero'
const controller = require(`./${baseUrl}.controller`)

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)
    
    // 1. Paginated List of SuperHeroes
    router.post('/:paginate/:limit', jwt, async (ctx, next) => controller.find(ctx, next))
    // 2. Create SuperHero
    router.post('/create', jwt, async (ctx, next) => controller.save(ctx, next))
    // 3. Update SuperHero
    router.patch('/:id', jwt, async (ctx, next) => controller.update(ctx, next))
    // 4. Delete SuperHero
    router.get('/:id', jwt, async (ctx, next) => controller.findById(ctx, next))
    // 5. View single SuperHero
    router.del('/:id', jwt, async (ctx, next) => controller.remove(ctx, next))

    return router
}

module.exports = (jwt) => createRoutes(jwt)