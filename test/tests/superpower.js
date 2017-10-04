module.exports = (mocha, request, expect, user) => {
    let _token = ""
    let _superpower = {}

    mocha.describe('SuperPower in App', () => {
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
        // List SuperPower
        mocha.it('should run POST /app/superpower and return superpowers', (done) => {
            request
                .post('/api/superpower/1/10')
                .set('Authorization', _token)
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.a('array')
                    expect(res.body[0]).to.have.property('name')
                    expect(res.body[0]).to.have.property('description')
                    done()
                })
        })
        // Post Create SuperPower
        mocha.it('should run POST /app/superpower/create and return superpower created', (done) => {
            request
                .post('/api/superpower/create')
                .set('Authorization', _token)
                .send({
                    name: "Run",
                    description: "Run fast",
                })
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    _superpower = res.body.result
                    expect(res.body.message).to.equal('Saved with Success!')
                    expect(res.body.result).to.be.a('object')
                    expect(res.body.result).to.have.property('name')
                    expect(res.body.result).to.have.property('description')
                    done()
                })
        })
        // Get Create SuperPower
        mocha.it('should run GET /app/superpower and return superpower', (done) => {
            request
                .get('/api/superpower/' + _superpower._id)
                .set('Authorization', _token)
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    done()
                })
        })
        // Patch SuperPower
        mocha.it('should run PATCH /app/superpower/:id and return superpower updated', (done) => {
            request
                .patch('/api/superpower/' + _superpower._id)
                .set('Authorization', _token)
                .send({
                    description: "Run better and faster",
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
        // Delete SuperPower
        mocha.it('should run DEL /app/superpower/:id and return superpower deleted', (done) => {
            request
                .del('/api/superpower/' + _superpower._id)
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
