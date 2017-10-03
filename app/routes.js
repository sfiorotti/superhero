const glob = require('glob')
const path = require('path')

const routesPath = path.resolve('app/modules')

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