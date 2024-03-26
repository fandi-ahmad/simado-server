const router = require("express").Router()
const { getAllCount } = require('../controllers/countController')

router.get('/', getAllCount)

module.exports = router