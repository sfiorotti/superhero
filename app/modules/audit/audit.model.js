module.exports = (mongoose) => {
    const Schema = mongoose.Schema
    const AuditSchema = new Schema({
        entity: {
            type: String
        },
        entityId: {
            type: Number
        },
        datetime: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String
        },
        action: {
            type: String
        }
    })

    return mongoose.model('Audit', AuditSchema)
}