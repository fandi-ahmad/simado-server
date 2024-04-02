const router = require("express").Router()
const { getAllCount } = require('../controllers/countController')
const { verificationToken } = require('../middleware/verifyToken')

router.get('/', verificationToken, getAllCount)

module.exports = router