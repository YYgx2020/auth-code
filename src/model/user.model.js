const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const User = seq.define('code_user', {
  // id 会被sequelize自动创建, 管理
  // 用户名
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一',
  },
  // 密码
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码',
  },
  code: {
    type: DataTypes.STRING(100),
    unique: false,
    comment: '用户伪验证码',
  }
})

// 强制同步数据库(创建数据表)
// { force: true }
User.sync()

module.exports = User