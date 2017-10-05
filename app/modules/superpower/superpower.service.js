const superPower = require('../../models').models.superpower
const service = new (require('../../common/serviceCommon'))(superPower)

module.exports = {
    save: service.save
}