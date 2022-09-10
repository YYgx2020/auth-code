// 专门用来上传图片的路由
const Router = require('koa-router')

const {login} = require('../controller/user.controller')
const { verifyLogin, judgeCodeIsExpired } = require('../middleware/user.middleware')

const router = new Router({prefix: '/api'})

// 登录时后端不需要再对密码进行加密，直接传输即可，后续拿到账号密码后再解密对比
router.post('/login', judgeCodeIsExpired, verifyLogin, login)

module.exports = router