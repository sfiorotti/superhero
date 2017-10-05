/**
 * @fileOverview RouterCommon is a module to be reused to create simplified dynamic routes
 *
 * @exports Router
 * @version 0.0.1
 */
let routerCommon = function(controller, router, jwt) {
    router.del(`/:id`, jwt, controller.remove)
    router.get(`/:id`, jwt, controller.findById)
    router.patch(`/:id`, jwt, controller.update)
    router.post(`/paginate/:limit`, jwt, controller.find)
    router.post(`/creat`, jwt, controller.save)
    return router
}

module.exports = routerCommon
