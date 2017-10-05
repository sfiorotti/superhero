/**
 * @fileOverview Help Controller is a responsible for the help business rule
 *
 * 
 * @exports object
 * @version 0.0.1
 */
const geolib = require('geolib')
const superHeroService = require('../superhero/superhero.service')

const help = async (ctx, next) => {
    let help = []
    if (ctx.request.body.lat || ctx.request.body.long) {
        ctx.body = { message: `Params 'lat' or 'long' not passed!` }
        ctx.status = 500
    }
    let superHeroes = await superHeroService.findAll()
    for (let superHero of superHeroes) {
        if (help.length >= 8)
            break
        if (!superHero.protectionArea || !superHero.protectionArea.lat || !superHero.protectionArea.long)
            continue

        let distance = await geolib.getDistance({ latitude: superHero.protectionArea.lat, longitude: superHero.protectionArea.long },
                                        { latitude: ctx.request.body.lat, longitude: ctx.request.body.long })
        if (distance < 10000) {
            help.push(superHero)
        }
    }
    ctx.body = help
    ctx.status = 200
}

module.exports =  {
    help
}