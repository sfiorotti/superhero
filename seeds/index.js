const bcrypt = require('bcryptjs')

const instance = require('../app/instance')

const models = require('../app/models').init()

const user = require('../app/modules/user/user.service')
const superHero = require('../app/modules/superhero/superhero.service')
const superPower = require('../app/modules/superpower/superpower.service')

instance.mongoose.connection.dropDatabase(async (err) => {
    if (err) return

    console.log('Drop Database')
    await user.save({
        username: "admin",
        password: bcrypt.hashSync("123", 8),
        role: ["Admin"]
    })
    console.log('User Admin Created')
    await user.save({
        username: "standard",
        password: bcrypt.hashSync("123", 8),
        role: ["Standard"]
    })
    console.log('User Standard Created')
    let superPowerModel = await superPower.save({
        name: "Invisibility",
        description: "Invisibility Power"
    })
    console.log('Super Power Created')
    await superHero.save({
        name: "Superman",
        alias: "Clark Kent",
        superPower: [superPowerModel._id],
        protectionArea: {
            name: "New York",
            lat: "-23.583187",
            long: "-46.659435",
            radius: "10"
        }
    })
    console.log('Super Hero Created')

    process.exit(0)
})


