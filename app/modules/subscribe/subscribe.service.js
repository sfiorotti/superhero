const request = require('koa2-request')

const send = async (data) => {
    await request({
        url: `http://localhost:3000/api/subscribe/send/`,
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
