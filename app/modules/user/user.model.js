module.exports = (mongoose) => {
    const Schema = mongoose.Schema
    const UserSchema = new Schema({
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        role: [{
            type: String,
            enum: ['Standard', 'Admin']
        }]
    })

    return mongoose.model('User', UserSchema)
}