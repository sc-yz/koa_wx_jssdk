const wx_config = require('../config')
const api = require('../api')
const cache = require('memory-cache')
const debug = require('debug')('dev:server')
const sign = require('../plugins/sign')

const a = {
  async share(ctx, next) {

    const { url } = ctx.request.query ? ctx.request.query : 'http://www.waqll.com'
    //先判断缓存中是否存在jsapi_token
    let jsapi_ticket = ''
    let cache_jsapi_ticket = cache.get('cache_jsapi_ticket')
    if (!cache_jsapi_ticket) {

      // 判断缓存中是否存在access_token
      let cache_access_token = cache.get('cache_access_token')
      let accessToken = ''
      if (!cache_access_token) {
        let form = {
          appid: wx_config.appID,
          secret: wx_config.appsecret
        }
        //获取access_token
        let accessTokenResult = await api.get_access_token(form)
        console.log(accessTokenResult)
        accessToken = accessTokenResult.status === 200 ? accessTokenResult.data.access_token : ''
        debug('接口中重新获取的accessToken:' + accessToken)
        //获取到access_token之后，存在缓存中
        cache.put('cache_access_token', accessToken, 7190000, function (key, value) {
          debug(key + ' did ' + value);
        });
      } else {
        accessToken = cache_access_token
        debug('缓存中的accessToken:' + accessToken)
      }
      debug('最终的accessToken:' + accessToken)
      let jsapiTicketResult = await api.get_jsapi_ticket({ access_token: accessToken })
      jsapi_ticket = jsapiTicketResult.data.errcode === 0 && jsapiTicketResult.data.ticket ? jsapiTicketResult.data.ticket : ''
      debug('接口获取的jsapi_ticket:' + jsapiTicketResult.data.ticket)
      cache.put('cache_jsapi_ticket', jsapi_ticket, 7190000, function (key, value) {
        debug(key + ' did ' + value);
      });

    } else {
      jsapi_ticket = cache_jsapi_ticket
    }


    debug('最终的jsapi_ticket:' + jsapi_ticket)


    const endSign = sign(jsapi_ticket, url)
    debug('最终的sign为：' + JSON.stringify(endSign))

    return ctx.body = { status: 200, result: endSign, message: '获取成功' }
  }
}

module.exports = a
