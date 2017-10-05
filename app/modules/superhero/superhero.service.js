const superHero = require('../../models').models.superhero
const service = new (require('../../common/serviceCommon'))(superHero)

const findBySuperPower = async (superPower) => {
    return await superHero.find({ superPower }).populate('SuperPower')
}

module.exports = {
    findBySuperPower,
    findAll: service.findAll
}