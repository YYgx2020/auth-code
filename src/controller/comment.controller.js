


class CommentController {
  async getCommentsList(ctx, next) {
    console.log(ctx);
  }

  async sendComment(ctx, next) {
    console.log("header: ", ctx.request.header);
  }
}

module.exports = new CommentController()