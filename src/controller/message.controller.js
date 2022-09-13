
const { messageSendError, messageGetError, messageUpdateError } = require('../constant/err.type')

const { createMessage, getMessageList, updateById, deleteById } = require('../service/message.service')

class MessageController {
  // 创建留言消息
  async createMessage(ctx, next) {
    console.log('前端发送过来的留言消息', ctx.request.body);
    try {
      function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      const { nickName, email, content, origin, articleId } = ctx.request.body;
      // 使用默认头像，网名，邮箱，发送时间，来源
      let referer = '';
      // console.log("ctx.origin.indexOf('lianghongyi')：", ctx.origin.indexOf('lianghongyi'));
      if (ctx.request.header.origin.indexOf('lianghongyi') !== -1) {
        referer = 'https://ygapi.lianghongyi.com';
      } else {
        referer = 'http://' + ctx.host;
      }
      const avatar = `${referer}/default/${getRandom(1, 20)}.png`;

      const res = await createMessage(avatar, nickName, email, content, origin, articleId)
      console.log('留言消息新建成功', res);
      ctx.body = {
        code: 200,
        message: '留言成功',
        result: '',
      }
    } catch (error) {
      // console.log(error);
      ctx.app.emit('error', messageSendError, ctx)
    }
  }

  // 获取留言消息
  async getMessage(ctx, next) {
    try {
      const { offset, limit, isSelected, articleId } = ctx.query;
      const res = await getMessageList({ offset, limit, isSelected, articleId })
      // console.log('返回的信息：', res);
      ctx.body = {
        code: 200,
        message: '数据获取成功',
        result: res,
      }
    } catch (error) {
      // console.log('get: ', error);
      ctx.app.emit('error', messageGetError, ctx)
    }
  }

  // 更新留言消息
  async updateMessage(ctx, next) {
    try {
      let { id, isSelected, like, origin, articleId } = ctx.request.body;
      let res = await updateById({ id, isSelected, like, origin, articleId });
      console.log('数据更新结果：', res);
      ctx.body = {
        code: 200,
        message: '留言消息更新成功',
        result: '',
      }
    } catch (error) {
      // console.log('留言消息更新失败', error);
      ctx.app.emit('error', messageUpdateError, ctx);
    }
  }

  // 删除留言消息
  async deleteMessage(ctx, next) {
    try {
      let { id } = ctx.request.body;
      let res = await deleteById({ id });
      console.log('数据更新结果：', res);
      ctx.body = {
        code: 200,
        message: '留言消息删除成功',
        result: '',
      }
    } catch (error) {
      ctx.app.emit('error', messageDeleteError, ctx);
    }
  }
}

module.exports = new MessageController()