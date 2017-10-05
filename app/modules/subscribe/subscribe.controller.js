/**
 * @fileOverview Subscribe Controller is a responsible for the subscribe business rule
 *
 * 
 * @exports object
 * @version 0.0.1
 */
const sse = require('sse-broadcast')()

const subscribe = async (ctx, next) => {
    sse.subscribe('channel', ctx.res)
    ctx.respond = false
    await next()
}

const send = async (ctx, next) => {
    sse.publish('channel', 'Message', ctx.request.body)
    ctx.body = null
    await next()
}

module.exports =  {
    subscribe,
    send
}