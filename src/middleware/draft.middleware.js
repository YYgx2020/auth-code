const {getOne} = require('../service/draft.service')

const verifyDraft = async (ctx, next) => {
  const {createTime} = ctx.request.body;
  try {
    const res = await getOne({createTime});
    // console.log('res: ', res);
    if (!res) {
      await next()
    } else {
      ctx.body = {
        code: 200,
        exit: true,
        res,
      }
    }
  } catch (error) {
    console.log('error: ');
  }
}

module.exports = {
  verifyDraft
}