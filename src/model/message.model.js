const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model yg_message -> 表 yg_messages)
const Message = seq.define('yg_message', {
  // 留言网友的头像
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '网络头像，不唯一',
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '网名，不唯一',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '邮箱，不唯一'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '留言内容'
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '点赞量',
  },
  sendTime: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '留言消息发送的时间戳',
  },
  checkTime: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '0',
    comment: '溢狗审核该留言的时间，默认为 0，表示还没有审核',
  },
  isSelected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否被精选，1-精选，0-未精选（默认）',
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0,
    comment: '留言消息的来源',
  },
  articleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '如果留言消息来自某篇文章，则保存该文章的id',
  }
})

// 强制同步数据库(创建数据表)
// { force: true }
Message.sync()

module.exports = Message