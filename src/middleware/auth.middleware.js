const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default');

const {
  tokenExpiredError,
  jsonWebTokenError,
} = require('../constant/err.type')


const auth = async (ctx, next) => {
  console.log("header: ", ctx.request.header);
  // const { authorization: token } = ctx.request.header
  const {authorization} = ctx.request.header
  const token = authorization.replace('bearer ', '')
  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
    // ctx.body = {
    //   code: 200,
    //   message: 'token有效'
    // }
    await next()
  } catch (error) {
    console.log("错误：", error.name);
    switch (error.name) {
      case 'TokenExpiredError': 
        console.log('token已过期');
        ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.log('无效token');
        ctx.app.emit('error', jsonWebTokenError, ctx)
    }
  }
}

const hadAdminPermission = async (ctx, next) => {
  // console.log('用户类型：', ctx.state.user);
  const {isAdmin} = ctx.state.user
  if (isAdmin) {
    ctx.body = {
      code: 200,
      isAdmin: true
    }
  } else {
    ctx.body = {
      code: 200,
      isAdmin: false
    }
  }
}

module.exports = {
  auth,
  hadAdminPermission
}

