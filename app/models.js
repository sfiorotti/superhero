/**
 * @fileOverview Models is a module to get all files *.model.js and 
 * return Schemas Mongoose array
 *
 * @exports object
 * @version 0.0.1
 */

const glob = require('glob')
const path = require('path')

const modelsPath = path.resolve('app/modules')

const instance = require('./instance')
const mongoose = instance.mongoose

let models = []

/**
 * @function init
 * 
 * @return {void}
 * @description Initialize a class to get all files *.model.js and push in models a Schema Mongoose
 * @public
 */
const init = () => {
    let files = glob.sync(`${modelsPath}/**/*.model.js`, { dot: true })
    files.forEach((model) => {
        const fileName = modelName(model)
        models[fileName] = (require(model)(mongoose))
    })
    return
}

/**
 * @function modelName
 * 
 * @param  {string} model
 * @return {string}
 * @description Return a name of models
 * @public
 */
const modelName = (model) => {
    let result = model.split('/')
    return result[result.length - 1].replace('.model.js', '')
}

module.exports = {
    models,
    init
}