const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
chai.should()

const supertest = require('supertest')
const app = require('../server')
const request = supertest.agent(app.listen())

let user = { 
    username: "admin",
    password: "123"
}

require('./tests/auth')(mocha, request, expect, user)
require('./tests/user')(mocha, request, expect, user)
require('./tests/superhero')(mocha, request, expect, user)
require('./tests/superpower')(mocha, request, expect, user)
require('./tests/help')(mocha, request, expect, user)