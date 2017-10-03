const glob = require('glob')
const path = require('path')

const modelsPath = path.resolve('app/modules')

const instance = require('./instance')
const mongoose = instance.mongoose

let models = []
const init = async () => {
    let files = glob.sync(`${modelsPath}/**/*.model.js`, { dot: true })
    await files.forEach(function(model) {
        const fileName = modelName(model)
        models[fileName] = (require(model)(mongoose))
    })
}

const modelName = (model) => {
    let result = model.split('/')
    return result[result.length - 1].replace('.model.js', '')
}

module.exports = {
    models,
    init
}