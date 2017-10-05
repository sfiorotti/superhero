/**
 * @fileOverview Logger is a module to create simplified color log API in terminal
 * 
 *
 * @exports object
 * @version 0.0.1
 */
const chalk = require('chalk')

const generateChalk = color => msg => console.log(chalk.bold[color](`[${new Date().toISOString()}] ${msg}`))

const error = generateChalk('red')
const success = generateChalk('green')
const info = generateChalk('blue')
const warning = generateChalk('yellow')
const log = generateChalk('white')

module.exports = {
	error,
	success,
	info,
	warning,
	log,
}