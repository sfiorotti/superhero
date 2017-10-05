const request = require('koa2-request')
const api = require('../../config/api')

const send = async (data) => {
    await request({
        url: `${api.url}:${api.port.http}/${api.prefix}/subscribe/send/`,
        method: 'post',
        headers: {
            'content-type': 'application/json',
            'charset': 'UTF-8'
        },
        json: true,
        body: data
    })
}

module.exports = {
    send
}
