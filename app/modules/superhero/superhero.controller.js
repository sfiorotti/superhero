/**
 * @fileOverview SuperHero Controller is a responsible for the superhero model business rule
 *
 * 
 * @exports object
 * @version 0.0.1
 */
const superHero = require('../../models').models.superhero

const factory = new (require('../../common/controllerCommon'))(superHero)
const service = require('./superhero.service')

module.exports =  {
    find: factory.find,
    findById: factory.findById,
    save: factory.save,
    update: factory.update,
    remove: factory.remove
}