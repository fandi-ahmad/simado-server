const router = require("express").Router()
const { getAllCategory, createCategory, deleteCategory, updateCategory } = require('../controllers/categoryController')
const { verificationToken } = require('../middleware/verifyToken')

router.get('/', verificationToken, getAllCategory)
router.post('/create', verificationToken, createCategory)
router.delete('/delete/:id', verificationToken, deleteCategory)
router.put('/update', verificationToken, updateCategory)

module.exports = router