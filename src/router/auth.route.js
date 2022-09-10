// 处理用户认证的路由
const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')


const router = new Router({prefix: '/api/auth'})

router.post('/', auth)

router.post('/verifyUser', auth, hadAdminPermission)

module.exports = router