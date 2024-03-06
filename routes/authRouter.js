const router = require("express").Router()
const { loginUser, logoutUser } = require('../controllers/authController')
const { addAuthorization, checkAuthInLogin } = require('../middleware/verifyToken')

router.post('/login', loginUser)
// router.delete('/logout', logoutUser)
// router.get('/user-login', addAuthorization, getUserLogin)
// router.put('/user/update', addAuthorization, updateUserProfile)

module.exports = router