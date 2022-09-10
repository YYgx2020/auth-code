const Article = require('../model/article.model')

class ArticleService {
  async create({title, authorAvatar, cover, content, category, tag, abstract, createTime}) {
    const updateTime = createTime
    const comment = 0;
    const res = await Article.create({title, authorAvatar, cover, content, category, tag, abstract, createTime, updateTime, comment})
    return res.dataValues
  }

  async getAll({offset, limit, category }) {
    let where = {}
    category && Object.assign(where, {category})
    const res = await Article.findAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      where,
    })
    return res? res.reverse() : null;
  }

  async getAllData() {
    let res = Article.findAll()
    return res;
  }

  async getSingle({id}) {
    const res = await Article.findOne({
      where: {
        id,
      }
    })
    return res? res : null;
  }

  async updateById(id, title, content, like, read, category, tag, cover, abstract, updateTime, comment) {
    const where = {id}
    const updateData = {}
    title && Object.assign(updateData, {title})
    content && Object.assign(updateData, {content})
    like && Object.assign(updateData, {like})
    read && Object.assign(updateData, {read})
    category && Object.assign(updateData, {category})
    tag && Object.assign(updateData, {tag})
    cover && Object.assign(updateData, {cover})
    abstract && Object.assign(updateData, {abstract})
    updateTime && Object.assign(updateData, {updateTime})
    comment && Object.assign(updateData, {comment})
    const res = await Article.update(updateData, {where})
    return res;
  }

  async deleteById({id}) {
    const where = {id}
    const res = await Article.destroy({where})
    return res[0] > 0 ? true : false;
  } 
}

module.exports = new ArticleService()