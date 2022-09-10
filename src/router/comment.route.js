const Router = require('koa-router')

const {getCommentsList, sendComment} = require('../controller/comment.controller')


const router = new Router({prefix: '/api/comment'})

router.get('/get', getCommentsList)

router.post('/send', sendComment)

module.exports = router