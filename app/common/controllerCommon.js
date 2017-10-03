let controllerCommon = function(model) {
    let _service = new (require('./serviceCommon'))(model)

    const find = async (ctx, next) => {
        const paginate = parseInt(ctx.params.paginate)
        const limit = parseInt(ctx.params.limit)
        let all = await _service.find(ctx.request.body, paginate, limit)
        await next()

        ctx.body = all
        ctx.status = 200
    }
    const findById = async (ctx, next) => {
        let one = await _service.findById(ctx.params.id)
        await next()

        ctx.body = one
        ctx.status = 200
    }
    const save = async (ctx, next) => {
        let saved = await _service.save(ctx.request.body)
        await next()

        ctx.body = { message: `Saved with Success!`, result: saved }
        ctx.status = 200
    }
    const update = async (ctx, next) => {
        let updated = await _service.update(ctx.params.id, ctx.request.body)
        await next()

        ctx.body = { message: `Updated with Success!`, result: updated }
        ctx.status = 200
    }
    const remove = async (ctx, next) => {
        let removed = await _service.remove(ctx.params.id)
        await next()

        ctx.body = { message: `Remove with Success!`, result: removed }
        ctx.status = 200
    }
    return {
        find,
        findById,
        save,
        update,
        remove
    }
}

module.exports = controllerCommon
