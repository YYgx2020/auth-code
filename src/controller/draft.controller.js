
const { draftCreateError, draftGetError, draftUpdateError, draftDeleteError, } = require('../constant/err.type')

const { create, get, updateByCreateTime, deleteById} = require('../service/draft.service');

class DraftController {
  async create(ctx, next) {
    try {
      const { authorAvatar, createTime } = ctx.request.body;
      // const title = '无标题';
      // console.log('authorAvatar：', authorAvatar);
      const res = await create({ title: '', authorAvatar, cover: '', content: '', category: '', tag: JSON.stringify([]), abstract: '', createTime })
      ctx.body = {
        code: 200,
        message: '草稿创建成功',
        res,
      }
    } catch (error) {
      console.log('草稿文章生成错误：', error);
      ctx.app.emit('error', draftCreateError, ctx)
    }
  }

  async get(ctx, next) {
    try {
      const { offset, limit, } = ctx.query;
      const res = await get({ offset, limit, })
      ctx.body = {
        code: 200,
        message: '数据获取成功',
        res,
      }
    } catch (error) {
      console.log('草稿文章获取错误：', error);
      ctx.app.emit('error', draftGetError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const { title, content, category, tag, cover, abstract, createTime, updateTime } = ctx.request.body;

      const res = await updateByCreateTime({title, content, category, tag, cover, abstract, createTime, updateTime});
      ctx.body = {
        code: 200,
        message: '草稿更新成功!',
        result: '',
      }

    } catch (error) {
      console.log('草稿文章更新错误：', error);
      ctx.app.emit('error', draftUpdateError, ctx);
    }
  }

  async deleteDraft(ctx, next) {
    try {
      let {id} = ctx.request.body;
      // console.log("查看前端传过来的数据：", ctx.request.body);
      let res = await deleteById(id)
      // console.log('数据删除结果：', res);
      ctx.body = {
        code: 200,
        message: '草稿删除成功',
        result: '',
      }
    } catch (error) {
      console.log('草稿文章删除错误：', error);
      ctx.app.emit('error', draftDeleteError, ctx)
    }
  }
}

module.exports = new DraftController()