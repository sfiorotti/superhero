/**
 * @fileOverview JWT Middleware is a module responsible for jwt
 *
 * 
 * @exports koa-jwt
 * @version 0.0.1
 */
const convert = require('koa-convert')
const jwt = require('koa-jwt')
const options = require('../config/api').jwt

module.exports = convert(jwt({ secret: options.public }))
