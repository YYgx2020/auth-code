const Router = require('koa-router')

const router = new Router({prefix: '/api/draft'})
const {auth} = require('../middleware/auth.middleware')
const {verifyDraft} = require('../middleware/draft.middleware')
const {create, get, update, deleteDraft } = require('../controller/draft.controller')


router.post('/create', auth, verifyDraft, create);
// router.post('/create', create);

router.get('/get', get)

// 获取单篇草稿内容
router.get('/getone', auth, verifyDraft)

router.post('/update', auth, update)

router.post('/delete', auth, deleteDraft)

module.exports = router