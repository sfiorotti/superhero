const superHero = require('../../models').models.superhero

const findBySuperPower = async (superPower) => {
    return await superHero.find({ superPower }).populate('SuperPower')
}

module.exports = {
    findBySuperPower
}