module.exports = (mocha, request, expect, user) => {
    let _token = ""
    let _superhero = {}

    mocha.describe('SuperHero in App', () => {
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
        // List SuperHero
        mocha.it('should run POST /app/superhero and return superheroes', (done) => {
            request
                .post('/api/superhero/1/10')
                .set('Authorization', _token)
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.a('array')
                    expect(res.body[0]).to.have.property('name')
                    expect(res.body[0]).to.have.property('alias')
                    expect(res.body[0]).to.have.property('superPower')
                    done()
                })
        })
        // Post Create SuperHero
        mocha.it('should run POST /app/superhero/create and return superhero created', (done) => {
            request
                .post('/api/superhero/create')
                .set('Authorization', _token)
                .send({
                    name: "Spiderman",
                    alias: "Peter",
                })
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    _superhero = res.body.result
                    expect(res.body.message).to.equal('Saved with Success!')
                    expect(res.body.result).to.be.a('object')
                    expect(res.body.result).to.have.property('name')
                    expect(res.body.result).to.have.property('alias')
                    done()
                })
        })
        // Get Create SuperHero
        mocha.it('should run GET /app/superhero and return superhero', (done) => {
            request
                .get('/api/superhero/' + _superhero._id)
                .set('Authorization', _token)
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('alias')
                    done()
                })
        })
        // Patch SuperHero
        mocha.it('should run PATCH /app/superhero/:id and return superhero updated', (done) => {
            request
                .patch('/api/superhero/' + _superhero._id)
                .set('Authorization', _token)
                .send({
                    alias: "Peter Parker",
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
        // Delete SuperHero
        mocha.it('should run DEL /app/superhero/:id and return superhero deleted', (done) => {
            request
                .del('/api/superhero/' + _superhero._id)
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
