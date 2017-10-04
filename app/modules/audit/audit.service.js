const audit = require('../../models').models.audit
const service = new (require('../../common/serviceCommon'))(audit)

module.exports = {
    save: service.save
}