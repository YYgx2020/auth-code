// 参考文档： https://www.jianshu.com/p/d7da178de59a

const User = require('../model/user.model')


class UserService {

  // 创建用户
  async createUser({ username, password }) {
    const res = await User.create({ username, password })
    // console.log(res)

    return res.dataValues
  }

  // 获取用户信息
  async getUserInfo({ username, password, code }) {
    const whereOpt = {}
    // 如果有密码，则加入密码一起查
    username && Object.assign(whereOpt, { username })
    password && Object.assign(whereOpt, { password })
    code && Object.assign(whereOpt, { code })
    // console.log('service:', username);
    const res = await User.findOne({
      // 验证用户密码的时候需要拿到用户的密码
      // attributes: ['id', 'email', 'password', 'username', 'register_time', 'is_admin', 'motto', 'user_avatar'],
      attributes: ['id', 'username', 'code', 'signature'],
      where: whereOpt,
    })
    return res ? res.dataValues : null;
  }

  // 更新用户信息
  async updateUserInfo({ username, code, signature }) {
    // console.log('username:', username);
    const whereOpt = { username }
    const user = { code, signature }
    const res = await User.update(user, { where: whereOpt });
    return res[0];
  }
}

module.exports = new UserService()