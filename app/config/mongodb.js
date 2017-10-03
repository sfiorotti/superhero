const dbInstance = 'SuperHero'
const ip = 'localhost'
const port = 27017

module.exports = {
    connection: {
        url: `mongodb://${ip}:${port}/${dbInstance}`,
        port: port
    },
    options: {
        useMongoClient: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
    }
}