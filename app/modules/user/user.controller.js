const bcrypt = require('bcryptjs')

const user = require('../../models').models.user

const factory = new (require('../../common/controllerCommon'))(user)
const service = require('./user.service')

const save = async (ctx, next) => {
    if (!ctx.request.body.password) {
        ctx.body = { message: `Params 'password' not passed!`  }
        ctx.status = 500
        return
    }
    let hash = bcrypt.hashSync(ctx.request.body.password, 8)
    ctx.request.body.password = hash
    ctx.request.body.role = ctx.request.body.role ? ctx.request.body.role : ['Standard'] 

    await factory.save(ctx, next)
}

module.exports =  {
    find: factory.find,
    findById: factory.findById,
    save: save,
    update: factory.update,
    remove: factory.remove
}