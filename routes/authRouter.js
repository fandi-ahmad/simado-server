const router = require("express").Router()
const { loginUser, getUserLogin, logoutUser } = require('../controllers/authController')

router.post('/login', loginUser)
router.get('/get-user', getUserLogin)
router.post('/logout', logoutUser)

module.exports = router