/**
 * @fileOverview Compress Middleware is a module responsible for compress
 *
 * 
 * @exports koa-compress
 * @version 0.0.1
 */
const compress = require('koa-compress')
const compressible = require('compressible')

module.exports =
    compress({
        filter: function (content_type) {
            return compressible(content_type)
        },
        threshold: 1024,
        flush: require('zlib').Z_SYNC_FLUSH
    })