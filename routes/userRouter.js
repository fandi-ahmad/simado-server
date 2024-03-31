const router = require("express").Router()
const { createUser, getAllUser, updateUser, deleteUser } = require('../controllers/userController')
const { verificationToken } = require('../middleware/verifyToken')

router.post('/create', verificationToken, createUser)
router.get('/', verificationToken, getAllUser)
router.put('/update', verificationToken, updateUser)
router.delete('/delete/:id', verificationToken, deleteUser)
// router.get('/user/search', getUser)
// router.post('/login', loginUser)
// router.delete('/logout', logoutUser)
// router.get('/user-login', addAuthorization, getUserLogin)
// router.put('/user/update', addAuthorization, updateUserProfile)

module.exports = router