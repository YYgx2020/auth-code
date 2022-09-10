const Router = require('koa-router')

const router = new Router({prefix: '/api/article'})
const {auth} = require('../middleware/auth.middleware')
// const {verifyDraft} = require('../middleware/draft.middleware')
const {create, getAll, getSingle, update, deleteArticle, updateComment, getTotalData } = require('../controller/article.controller')


router.post('/create', auth, create);

router.get('/getAll', getAll);

router.get('/getSingle', getSingle);

// 获取文章数据，文章总数，总阅读量、总点赞量
router.get('/getTotalData', getTotalData)

router.post('/update', auth, update)

// 单独更新文章的留言数
router.post('/updateComment', auth, updateComment)

router.post('/delete', auth, deleteArticle)

module.exports = router