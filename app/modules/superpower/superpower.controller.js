/**
 * @fileOverview SuperPower Controller is a responsible for the superpower model business rule
 *
 * 
 * @exports object
 * @version 0.0.1
 */
const superPower = require('../../models').models.superpower

const factory = new (require('../../common/controllerCommon'))(superPower)
const service = require('./superpower.service')

const superHeroService = require('../superhero/superhero.service')

const remove = async (ctx, next) => {
    let superHero = await superHeroService.findBySuperPower(ctx.params.id)
    if (superHero && superHero.length > 0) {
        ctx.body = { message: "Has one or more SuperHeroes with this SuperPower" }
        ctx.status = 500
        return
    }
    await factory.remove(ctx, next)
}

module.exports =  {
    find: factory.find,
    findById: factory.findById,
    save: factory.save,
    update: factory.update,

    // 9a. If the superpower is associated to any superhero, the action has to be blocked
    remove: remove
}