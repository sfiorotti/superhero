module.exports = (mongoose) => {
    const Schema = mongoose.Schema
    const SuperHeroSchema = new Schema({
        name: {
            type: String,
            unique: true
        },
        alias: {
            type: String
        },
        superPower: [{
            type: Schema.Types.ObjectId,
            ref: 'SuperPower'
        }],
        protectionArea: {
            name: {
                type: String
            },
            lat: {
                type: Number
            },
            long: {
                type: Number
            },
            radius: {
                type: Number
            }
        }
    })

    return mongoose.model('SuperHero', SuperHeroSchema)
}