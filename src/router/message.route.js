const Router = require('koa-router')

const router = new Router({ prefix: '/api/message' })
const {auth} = require('../middleware/auth.middleware')
const { createMessage, getMessage, updateMessage, deleteMessage } = require('../controller/message.controller')

// 留言消息不需要进行太多判断，直接存入数据库即可
router.post('/send', createMessage);

router.get('/get', getMessage);

router.post('/update', auth, updateMessage);

router.post('/delete', auth, deleteMessage);

module.exports = router