const audit = require('../../models').models.audit

const factory = new (require('../../common/controllerCommon'))(audit)
const service = require('./audit.service')

module.exports =  {
    find: factory.find,
    findById: factory.findById,
    save: factory.save,
    update: factory.update,
    remove: factory.remove
}