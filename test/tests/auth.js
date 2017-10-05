module.exports = (mocha, request, expect, user) => {
    let _token = ""
    let _user = {}

    mocha.describe('Auth in App', () => {
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
        mocha.it('should run POST /app/auth and return Params `username` not passed!', (done) => {
            request
                .post('/api/auth/')
                .send({
                    password: "123"
                })
                .expect(500, (err, res) => {
                    if (err) done(err)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Params 'username' not passed!")
                    done()
                })
        })
        mocha.it('should run POST /app/auth and return User not found!', (done) => {
            request
                .post('/api/auth/')
                .send({
                    username: "admin2",
                    password: "123"
                })
                .expect(404, (err, res) => {
                    if (err) done(err)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("User admin2 not found!")
                    done()
                })
        })
        mocha.it('should run POST /app/auth and return Password invalid!', (done) => {
            request
                .post('/api/auth/')
                .send({
                    username: "admin",
                    password: "1234"
                })
                .expect(500, (err, res) => {
                    if (err) done(err)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Password invalid!")
                    done()
                })
        })
    })
}