/**
 * @fileOverview ACL Middleware is a module responsible for verifying that the user who 
 * is accessing the url has sufficient permission
 *
 * @exports object
 * @version 0.0.1
 */
const acl = require('../acl').acl
const audit = require('./audit')
const subscribeService = require('../modules/subscribe/subscribe.service')

const hasPermission = async (ctx, next, permission) => {
	const user = ctx.state.user
    const isAllowed = await acl.isAllowed(user.data.username, permission, '*')
    if (!isAllowed) {
        ctx.body = { message: `${user.data.username} has access denied!` }
        ctx.status = 403
        return
    }
    await next()

    let data = await audit.auditing(user.data.username, permission)
    if (data)
        await subscribeService.send(data)
}

const superHeroList = async (ctx, next) => hasPermission(ctx, next, 'superhero_list')
const superHeroCreate = async (ctx, next) => hasPermission(ctx, next, 'superhero_create')
const superHeroUpdate = async (ctx, next) => hasPermission(ctx, next, 'superhero_update')
const superHeroDelete = async (ctx, next) => hasPermission(ctx, next, 'superhero_delete')
const superHeroView = async (ctx, next) => hasPermission(ctx, next, 'superhero_view')
const superPowerList = async (ctx, next) => hasPermission(ctx, next, 'superpower_list')
const superPowerCreate = async (ctx, next) => hasPermission(ctx, next, 'superpower_create')
const superPowerUpdate = async (ctx, next) => hasPermission(ctx, next, 'superpower_update')
const superPowerDelete = async (ctx, next) => hasPermission(ctx, next, 'superpower_delete')
const superPowerView = async (ctx, next) => hasPermission(ctx, next, 'superpower_view')
const userList = async (ctx, next) => hasPermission(ctx, next, 'user_list')
const userCreate = async (ctx, next) => hasPermission(ctx, next, 'user_create')
const userUpdate = async (ctx, next) => hasPermission(ctx, next, 'user_update')
const userDelete = async (ctx, next) => hasPermission(ctx, next, 'user_delete')
const subscribe = async (ctx, next) => hasPermission(ctx, next, 'subscribe')
const helpMe = async (ctx, next) => hasPermission(ctx, next, 'helpme')

module.exports = {
    superHeroList,
    superHeroCreate,
    superHeroUpdate,
    superHeroDelete,
    superHeroView,
    superPowerList,
    superPowerCreate,
    superPowerUpdate,
    superPowerDelete,
    superPowerView,
    userList,
    userCreate,
    userUpdate,
    userDelete,
    subscribe,
    helpMe
}