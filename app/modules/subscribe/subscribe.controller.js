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