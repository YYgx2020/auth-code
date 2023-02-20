// 引入 jwt 密钥
const { JWT_SECRET } = require('../config/config.default')
const { createUser, getUserInfo, updateUserInfo } = require('../service/user.service')

const { userRegisterError, loginError, getUserInfoError, resetError, accountNotExited, userInfoUpdateError } = require('../constant/err.type')

class UserController {
  // 用户注册处理
  async register(ctx, next) {
    // 先查看当前用户是否存在
    const {username, password} = ctx.request.body
    const res = await getUserInfo({username});
    if (res !== null) {
      ctx.body = {
        code: 1001,
        message: '用户已存在',
        result: '',
      }
    } else {
      // 执行创建用户操作
      const res = await createUser({username, password})
      ctx.body = {
        code: 200,
        message: '用户注册成功',
        result: '',
      }
    }
  }

  // 用户登录处理
  async login(ctx, next) {
    const {username, password} = ctx.request.body;
    const res = await getUserInfo({username, password});
    if (res !== null) {
      ctx.body = {
        code: 200,
        message: '登录成功',
        result: res,
      }
    } else {
      ctx.body = {
        code: 1002,
        message: '登录失败，请检查用户名或密码',
        result: res,
      }
    }
  }

  // 更新用户信息
  async update(ctx, next) {
    const {username, code} = ctx.request.body;
    // console.log(username, code);
    const res = await updateUserInfo({username, code})
    ctx.body = {
      code: 200,
      message: '更新成功',
      result: '',
    }
  }

  // 查看认证码
  async findUserCode(ctx, next) {
    const {code} = ctx.request.body;
    console.log(ctx.request.body);
    console.log('code: ', code);
    const res = await getUserInfo({code})
    if (res !== null) {
      ctx.body = {
        code: 200,
        message: '认证码存在',
        result: '',
      }
    } else {
      ctx.body = {
        code: 1003,
        message: '认证码不存在',
        result: '',
      }
    }
  }

  // 获取用户信息
  async getInfo(ctx, next) {
    try {
      const {id} = ctx.query;
      const res = await getUserInfo({ id })
      ctx.body = {
        code: 200,
        message: '用户信息获取成功',
        res,
      }
    } catch (error) {
      ctx.app.emit('error', getUserInfoError, ctx)
    }
  }

}

module.exports = new UserController()