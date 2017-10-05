module.exports = (mocha, request, expect, user) => {
    let _token = ""
    let _user = {}

    mocha.describe('Help in App', () => {
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
        // Help Me
        mocha.it('should run POST /app/help and return 0 SuperHeroes', (done) => {
            request
                .post('/api/help/')
                .set('Authorization', _token)
                .send({
                    lat: "-22.583000",
                    long: "-45.659000"                    
                })
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.a('array')
                    done()
                })
        })
        // Help Me
        mocha.it('should run POST /app/help and return 1 SuperHero', (done) => {
            request
                .post('/api/help/')
                .set('Authorization', _token)
                .send({
                    lat: "-23.583187",
                    long: "-46.659435"                    
                })
                .expect(200, (err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.a('array')
                    done()
                })
        })
    })
}