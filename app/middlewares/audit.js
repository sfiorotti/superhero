/**
 * @fileOverview Audit Middleware is a module responsible for auditing 
 * the changes that occur in the database
 *
 * 
 * @exports object
 * @version 0.0.1
 */
const acl = require('../acl')
const service = require('../modules/audit/audit.service')

const auditing = async (username, permission) => {
    const permissionSplit = permission.split('_')

    if (permissionSplit[1] != 'create' && permissionSplit[1] != 'update' && permissionSplit[1] != 'delete')
        return 

    const permissions = acl.getPermissions()
    let audit = {
        username,
        entity: permissionSplit[0],
        action: permissionSplit[1].toUpperCase(),
        entityId: permissions.indexOf(permission) + 1
    }
    await service.save(audit)
    return audit
}

module.exports = {
    auditing
}