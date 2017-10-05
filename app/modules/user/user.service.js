const user = require('../../models').models.user
const service = new (require('../../common/serviceCommon'))(user)

module.exports = {
    findAll: service.findAll,
    findOne: service.findOne,
    save: service.save
}