const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'user'
const controller = require(`./${baseUrl}.controller`)

const acl = require('../../middlewares/acl')

const createRoutes = (jwt) => {
    let router = new Router()
    
    router.prefix(`/${prefix}/${baseUrl}`)

    // 11. Paginated List of Users
    router.post('/:paginate/:limit', jwt, acl.userList, controller.find)
    // 12. Create User
    router.post('/create', jwt, acl.userCreate, controller.save)
    // 13. Update User
    router.patch('/:id', jwt, acl.userUpdate, controller.update)
    // 14. Delete User
    router.del('/:id', jwt, acl.userDelete, controller.remove)

    return router
}

module.exports = (jwt) => createRoutes(jwt)