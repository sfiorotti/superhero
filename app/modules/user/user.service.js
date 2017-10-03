const user = require('../../models').models.user
const service = new (require('../../common/serviceCommon'))(user)

module.exports = {
    findOne: service.findOne
}