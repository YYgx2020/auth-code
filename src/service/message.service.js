const Message = require('../model/message.model')



class MessageService {
  async createMessage(avatar, nickName, email, content, origin, articleId) {
    const sendTime = new Date().getTime()  // 使用时间戳
    const res = await Message.create({avatar, nickName, email, content, sendTime, origin, articleId})
    return res.dataValues
  }

  // 获取留言消息
  async getMessageList({offset, limit, isSelected, articleId}) {
    const whereOpt = {}
    Object.assign(whereOpt, { isSelected })
    articleId && Object.assign(whereOpt, { articleId })
    const res = await Message.findAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      where: whereOpt,
    })
    return res? res.reverse() : null;
  }

  // 更新留言消息
  async updateById({id, isSelected, like, origin, articleId}) {
    const where = {}
    if (articleId) {
      Object.assign(where, {articleId})
    } else {
      Object.assign(where, {id})
    }
    const updateData = {}
    isSelected && Object.assign(updateData, {isSelected})
    like && Object.assign(updateData, {like})
    origin && Object.assign(updateData, {origin})
    articleId && Object.assign(updateData, {articleId})
    const res = await Message.update(updateData, { where })
    return res
  }

  async deleteById({id}) {
    const where = {id}
    const res = await Message.destroy({where})
    return res[0] > 0 ? true : false
  }
}

module.exports = new MessageService()