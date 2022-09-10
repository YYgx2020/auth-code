
const {create, getAll, getSingle, updateById, deleteById, getAllData} = require('../service/article.service');
const {articleCreateError, articleGetError, articleUpdateError, articleDeleteError, getTotalDataError} = require('../constant/err.type');

class ArticleController {
  async create(ctx, next) {
    try {
      const {title, authorAvatar, cover, content, category, tag, abstract, createTime} = ctx.request.body;
      const res = await create({title, authorAvatar, cover, content, category, tag, abstract, createTime});
      ctx.body = {
        code: 200,
        message: '文章创建成功',
        res,
      }
    } catch (error) {
      ctx.app.emit('error', articleCreateError, ctx)
    }
  }

  async getAll(ctx, next) {
    try {
      const { offset, limit, category } = ctx.query;
      const res = await getAll({ offset, limit, category })
      ctx.body = {
        code: 200,
        message: '数据获取成功',
        res,
      }
    } catch (error) {
      console.log('文章获取错误：', error);
      ctx.app.emit('error', articleGetError, ctx)
    }
  }

  async getSingle(ctx, next) {
    try {
      const { id } = ctx.query;
      const res = await getSingle({ id })
      ctx.body = {
        code: 200,
        message: '数据获取成功',
        res,
      }
    } catch (error) {
      console.log('文章获取错误：', error);
      ctx.app.emit('error', articleGetError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      // console.log('文章需要更新的数据：', ctx.request.body);
      const { id, title, content, like, read, category, tag, cover, abstract, updateTime, comment } = ctx.request.body;
      const res = await updateById(id, title, content, like, read, category, tag, cover, abstract, updateTime, comment);
      ctx.body = {
        code: 200,
        message: '文章更新成功!',
        res,
      }
    } catch (error) {
      // console.log('草稿文章更新错误：', error);
      ctx.app.emit('error', articleUpdateError, ctx);
    }
  }

  // 单独更新文章的留言数
  async updateComment(ctx, next) {
    try {
      // 先根据文章的 id 获取文章的留言数目，然后再根据前端传过来的标志 加 1 还是 减 1
      const { id, title, content, like, read, category, tag, cover, abstract, updateTime, sign } = ctx.request.body;
      const res = await getSingle({id})
      // console.log("查看");
      let comment = res.comment;
      if (sign == 'add') {
        comment++;
      } else {
        comment--;
      }
      console.log('comment: ', comment);
      const res1 = await updateById(id, title, content, like, read, category, tag, cover, abstract, updateTime, comment);
      ctx.body = {
        code: 200,
        message: '文章评论数目更新成功!',
        res1,
      }
    } catch (error) {
      console.log('error', error);
      ctx.app.emit('error', articleUpdateError, ctx);
    }
  }

  async deleteArticle(ctx, next) {
    try {
      let {id} = ctx.request.body;
      let res = await deleteById({id})
      console.log('数据删除结果：', res);
      ctx.body = {
        code: 200,
        message: '文章删除成功',
        result: '',
      }
    } catch (error) {
      console.log('文章删除错误：', error);
      ctx.app.emit('error', articleDeleteError, ctx);
    }
  }

  // 获取文章总数据
  async getTotalData(ctx, next) {
    try {
      let res = await getAllData();
      res = JSON.stringify(res)
      // console.log('所有文章的数据：', JSON.parse(res));
      let resArr = JSON.parse(res)
      let articleNum = resArr.length;
      let read = 0;
      let like = 0;
      // console.log('长度：', articleNum);
      resArr.forEach((item, index) => {
        read += item.read;
        like += item.like;
      })
      ctx.body = {
        code: 200,
        message: 'ok',
        result: {
          articleNum,
          read,
          like,
        }
      }
    } catch (error) {
      console.log('error: ', error);
      ctx.app.emit('error', getTotalDataError, ctx);
    }
  }
}

module.exports = new ArticleController()