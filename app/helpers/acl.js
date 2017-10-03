const NodeACL = require('acl')
const acl = new NodeACL(new NodeACL.memoryBackend())

const models = require('../models')
models.init()

const userModel = models.models.user

const getRoles = () => [
	'Admin',
	'Standard'
]

const getPermissions = () => [
	'superhero_list', // 1 Standard
	'superhero_create', // 2
	'superhero_update', // 3
	'superhero_delete', // 4
	'superhero_view', // 5 Standard
	'superpower_list', // 6 Standard
	'superpower_create', // 7
	'superpower_update', // 8
	'superpower_delete', // 9	
	'superpower_view', // 10 Standard
	'user_list', // 11
	'user_create', // 12
	'user_update', // 13
	'user_delete', // 14
	'subscribe', // 16
    'helpme' // 17 Standard
]

const getTable = () => {
	const roles = getRoles()
	const permissions = getPermissions()

    let table = []
    table[roles[0]] = permissions
    table[roles[1]] = ['superhero_list', 'superhero_view', 'superpower_list', 'superpower_view', 'helpme']
	return table
}

const init = async () => {
    const table = getTable()
    acl.allow('Admin', table['Admin'], '*')
    acl.allow('Standard', table['Standard'], '*')    

	let users = await userModel.find({})
	for (let user of users) {
		for (let role of user.role) {
			acl.addUserRoles(user.username, role)
		}
	}
}

module.exports = {
	acl,
    getRoles,
    getPermissions,
    getTable,
    init
}
