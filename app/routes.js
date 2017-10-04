/**
 * @fileOverview Routes is a module to create all route app 
 *
 * @exports object
 * @requires app,jwt
 * @version 0.0.1
 */

const glob = require('glob')
const path = require('path')

const routesPath = path.resolve('app/modules')

/**
 * @function createRoutes
 * 
 * @param  {koa} app
 * @param  {koa-jwt} jwt
 * @return {void}
 * @description Create all routes to use in app
 * @public
 */
const createRoutes = async (app, jwt) => {
    let files = glob.sync(`${routesPath}/**/*.router.js`, { dot: true })
    await files.forEach((file) => {
        const route = require(file)(jwt)
        app.use(route.routes())
           .use(route.allowedMethods({
                throw: true
           }))
    })
}

module.exports = (app, jwt) => createRoutes(app, jwt)