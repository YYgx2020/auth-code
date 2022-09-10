const path = require('path')
const fs = require('fs')
const { imageUploadError, imageDeleteError } = require('../constant/err.type')

class ImageController {
  async upload(ctx, next) {
    // console.log(ctx.request.files);
    // console.log("body: ", ctx.request.body);
    try {
      const { file } = ctx.request.files
      // console.log("文件路径：", file);
      const basename = path.basename(file.path)
      console.log('basename: ', basename);
      ctx.body = {
        code: 200,
        url: `${ctx.origin}/img/${basename}`
      }
    } catch (error) {
      ctx.app.emit('error', imageUploadError, ctx);
    }
  }

  async deleteImg(ctx, next) {
    const { fileName } = ctx.request.body;
    // console.log('fileName: ', fileName);
    const dir = 'src/upload/img/';
    const file = dir + fileName;
    // console.log('file: ', file);
    try {
      fs.unlinkSync(file);
      ctx.body = {
        code: 200,
        message: '图片删除成功',
      }
    } catch (error) {
      console.log('error: ', error);
      ctx.app.emit('error', imageDeleteError, ctx);
    }
  }
}

module.exports = new ImageController()