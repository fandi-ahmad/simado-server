const router = require("express").Router()
const { loginUser, getUserLogin } = require('../controllers/authController')

router.post('/login', loginUser)
router.get('/get-user', getUserLogin)

module.exports = router