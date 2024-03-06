const router = require("express").Router()
const { getAllCategory, createCategory, deleteCategory, updateCategory } = require('../controllers/categoryController')

router.get('/', getAllCategory)
router.post('/create', createCategory)
router.delete('/delete/:id', deleteCategory)
router.put('/update', updateCategory)

module.exports = router