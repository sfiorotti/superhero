const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const options = require('../../config/api').jwt

const userService = require('../user/user.service')

const token = async (ctx, next) => {
    const params = ctx.request.body
    if (!params.username) {
        ctx.body = { message: `Params 'username' not passed!`  }
        ctx.status = 500
        return
    }
	let user = await userService.findOne({ username: params.username })
    if (!user) {
        ctx.body = { message: `User ${params.username} not found!` }
        ctx.status = 404
        return
    }
    let passwordValid = await bcrypt.compareSync(params.password, user.password)
    if (!passwordValid) {
        ctx.body = { message: `Password invalid!` }
        ctx.status = 500
        return
    }

    let token = jwt.sign({ data: user }, options.public)
    ctx.body = { token }
    ctx.status = 200
}

module.exports =  {
    token
}