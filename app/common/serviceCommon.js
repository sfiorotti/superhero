/**
 * @fileOverview ServiceCommon is a module to be reused to create simplified dynamic functions to 
 * create, update, remove and find with dynamic Schemas in MongoDB
 *
 * @exports object
 * @version 0.0.1
 */
let serviceCommon = function(model) {
    let _model = model

    const find = async (params, paginate, limit) => {
        if (!paginate) paginate = 1
        if (!limit) limit = 10
        const skip = ((paginate * limit) - limit) 
        return await _model.find(params, {}, { skip , limit })
    }
    const findAll = async (params) => {
        return await _model.find(params)
    }
    const findById = async (id) => {
        return await _model.findById({ _id: id })
    }
    const findOne = async (params) => {
        return await _model.findOne(params)
    }
    const save = async (params) => {
        let saved = new _model(params)
        return await saved.save()
    }
    const update = async (id, params) => {
        return await _model.update({ _id : id }, { $set: params })
    }
    const remove = async (id) => {
        return await _model.remove({ _id: id })
    }
    
    return { 
        find,
        findAll,
        findById,
        findOne,
        save,
        update,
        remove
    }
}

module.exports = serviceCommon
