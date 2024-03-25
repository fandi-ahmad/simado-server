const router = require("express").Router()
const { createUser, getAllUser, updateUser, deleteUser } = require('../controllers/userController')
const { addAuthorization, checkAuthInLogin } = require('../middleware/verifyToken')

router.post('/create', createUser)
router.get('/', getAllUser)
router.put('/update', updateUser)
router.delete('/delete/:id', deleteUser)
// router.get('/user/search', getUser)
// router.post('/login', loginUser)
// router.delete('/logout', logoutUser)
// router.get('/user-login', addAuthorization, getUserLogin)
// router.put('/user/update', addAuthorization, updateUserProfile)

module.exports = router