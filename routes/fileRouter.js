const router = require("express").Router()
const { getAllFile, createFile, deleteFile, updateFile, getFileByCategory } = require('../controllers/fileControllers')

router.get('/', getAllFile)
router.post('/create', createFile)
router.delete('/delete/:id', deleteFile)
router.put('/update', updateFile)

router.get('/category/:id_category', getFileByCategory)

module.exports = router