const request = require('../plugins/request')

const api = {
  get_access_token({ grant_type = 'client_credential', appid, secret }) {
    return request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      methods: 'get',
      params: {
        grant_type,
        appid,
        secret
      }
    })
  },
  get_jsapi_ticket({ access_token, type = 'jsapi' }) {
    return request({
      url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
      methods: 'get',
      params: {
        access_token,
        type
      }
    })
  }
}

module.exports = api