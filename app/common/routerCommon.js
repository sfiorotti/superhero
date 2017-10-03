let routerCommon = function(controller, router, jwt) {
    router.del(`/:id`, jwt, async (ctx, next) => controller.remove(ctx, next))
    router.get(`/:id`, jwt, async (ctx, next) => controller.findById(ctx, next))
    router.patch(`/:id`, jwt, async (ctx, next) => controller.update(ctx, next))
    router.post(`/paginate/:limit`, jwt, async (ctx, next) => controller.find(ctx, next))
    router.post(`/creat`, jwt, async (ctx, next) => controller.save(ctx, next))
    return router
}

module.exports = routerCommon
