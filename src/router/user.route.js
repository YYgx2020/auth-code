// 专门用来上传图片的路由
const Router = require('koa-router')

const { getInfo, register, login, update, findUserCode } = require('../controller/user.controller')
const router = new Router({ prefix: '/api/user' })

// 获取用户信息
router.get('/get', getInfo)
// 登录接口
router.post('/login', login)
// 注册接口
router.post('/register', register)
// 更新用户信息接口
router.post('/update', update)
// 查找认证码
router.post('/findCode', findUserCode)



module.exports = router