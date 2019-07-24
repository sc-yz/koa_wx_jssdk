
const a = require('../controller/wx_share.js')
console.log(a)

const router = require('koa-router')()
router.prefix('/node_wx/share')



router.get('/', (ctx, next) => a.share(ctx, next))

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
module.exports = router
