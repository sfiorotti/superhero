const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'superhero'
const controller = require(`./${baseUrl}.controller`)

const acl = require('../../middlewares/acl')

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)
    
    // 1. Paginated List of SuperHeroes
    router.post('/:paginate/:limit', jwt, acl.superHeroList, controller.find)
    // 2. Create SuperHero
    router.post('/create', jwt, acl.superHeroCreate, controller.save)
    // 3. Update SuperHero
    router.patch('/:id', jwt, acl.superHeroUpdate, controller.update)
    // 4. Delete SuperHero
    router.del('/:id', jwt, acl.superHeroDelete, controller.remove)
    // 5. View single SuperHero
    router.get('/:id', jwt, acl.superHeroView, controller.findById)

    return router
}

module.exports = (jwt) => createRoutes(jwt)