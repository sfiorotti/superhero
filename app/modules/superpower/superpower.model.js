module.exports = (mongoose) => {
    const Schema = mongoose.Schema
    const SuperPowerSchema = new Schema({
        name: {
            type: String,
            unique: true
        },
        description: {
            type: String
        }
    })

    return mongoose.model('SuperPower', SuperPowerSchema)
}