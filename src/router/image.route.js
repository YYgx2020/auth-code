// 专门用来上传图片的路由
const Router = require('koa-router')
const {auth} = require('../middleware/auth.middleware')
const {upload, deleteImg} = require('../controller/image.cotroller')

const router = new Router({prefix: '/api/image'})

router.post('/upload', auth, upload)

router.post('/delete', auth, deleteImg)

module.exports = router