module.exports = (mocha, request, expect, user) => {
    let _token = ""
    let _user = {}

    mocha.describe('User in App', () => {
        // Auth
        mocha.it('should run POST /app/auth and return token', (done) => {
            request
                .post('/api/auth/')
                .send(user)
                .expect(200, (err, res) => {
                    if (err) done(err)
                    expect(res.body).to.have.property('token')
                    _token = "Bearer " + res.body.token
                    done()
                })
        })
        // List User
        mocha.it('should run POST /app/user and return users', (done) => {
            request
                .post('/api/user/1/10')
                .set('Authorization', _token)
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.a('array')
                    expect(res.body[0]).to.have.property('username')
                    expect(res.body[0]).to.have.property('role')
                    done()
                })
        })
        // Post Create User
        mocha.it('should run POST /app/user/create and return user created', (done) => {
            request
                .post('/api/user/create')
                .set('Authorization', _token)
                .send({
                    username: "user",
                    password: "123",
                    role: ["Standard"]
                })
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    _user = res.body.result
                    expect(res.body.message).to.equal('Saved with Success!')
                    expect(res.body.result).to.be.a('object')
                    expect(res.body.result).to.have.property('username')
                    expect(res.body.result).to.have.property('password')
                    expect(res.body.result.password).to.not.equal('123')
                    done()
                })
        })
        // Patch User
        mocha.it('should run PATCH /app/user/:id and return user updated', (done) => {
            request
                .patch('/api/user/' + _user._id)
                .set('Authorization', _token)
                .send({
                    username: "user_update",
                })
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body.message).to.equal('Updated with Success!')
                    expect(res.body.result).to.be.a('object')
                    expect(res.body.result).to.have.property('ok')
                    expect(res.body.result).to.have.property('n')
                    expect(res.body.result.n).to.equal(1)
                    done()
                })
        })
        // Delete User
        mocha.it('should run DEL /app/user/:id and return user deleted', (done) => {
            request
                .del('/api/user/' + _user._id)
                .set('Authorization', _token)
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body.message).to.equal('Remove with Success!')
                    expect(res.body.result).to.be.a('object')
                    expect(res.body.result).to.have.property('ok')
                    expect(res.body.result).to.have.property('n')
                    expect(res.body.result.n).to.equal(1)
                    done()
                })
        })
    })
}