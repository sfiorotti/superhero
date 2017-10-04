/**
 * @fileOverview Instance is a module to be reused to get a mongo instance, global promise 
 * and connection
 *
 * @exports object
 * @version 0.0.1
 */

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const mongodb = require('./config/mongodb')

const instance = mongoose.connect(mongodb.connection.url, mongodb.options)
mongoose.connection.on('error', console.error)

module.exports = {
    instance,
    mongoose
}