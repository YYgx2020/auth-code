// 注册事件相关路由
const Router = require('koa-router')
const router = new Router({ prefix: '/api/register' })
// const {register} = require('../controller/user.controller')
const { register } = require('../controller/user.controller')
const { authCode } = require('../controller/code.controller')
const {
  verifyEmail,
  verifyUsername,
  judgeCodeIsExpired,
  crpytPassword
} = require('../middleware/user.middleware')

/* 
  接口说明：检查当前注册邮箱是否已经注册过
  接口调用逻辑：中间件处理
  接口调用形式：
  - /api/register/email
  - 参数（query）
    - email: 注册邮箱
*/
router.post('/email', verifyEmail)

/* 
  接口说明：检查当前用户名是否可用
  接口调用逻辑：中间件处理
  接口调用形式：
  - /api/register/username
  - 参数（query）
    - email: 注册邮箱
*/
router.post('/username', verifyUsername)

/* 
  接口说明：请求验证码
  接口调用逻辑：中间件处理
  接口调用形式：
  - /api/register/code
  - 参数（query）
    - email: 注册邮箱
*/
router.get('/code', authCode)

/* 
  接口说明：最后的注册接口
  接口调用逻辑逻辑：判断验证码是否过期(中间件) -> 密码加密(中间件) -> 将用户注册信息存入数据库中(控制层)
  接口调用形式：
  - /api/register
  - 参数（body）
    - email: 注册邮箱
    - username: 用户名
    - password: 密码
    - code: 验证码
*/
router.post('/', verifyEmail, verifyUsername, judgeCodeIsExpired, crpytPassword, register)


module.exports = router