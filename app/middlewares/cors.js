/**
 * @fileOverview Cors Middleware is a module responsible for cors
 *
 * 
 * @exports object
 * @version 0.0.1
 */
const convert = require('koa-convert')
const cors = require('koa-cors')
const corsError = require('koa-cors-error')

module.exports = {
    corsError: convert(corsError),
    cors: convert(cors(
      {
        origin: '*',
        methods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        headers: ['Content-Type', 'Authorization'],
      }
    ))
}