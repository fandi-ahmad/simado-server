const router = require("express").Router()
const { getAllFile, createFile, deleteFile, updateFile, getFileByCategory } = require('../controllers/fileControllers')
const { verificationToken } = require('../middleware/verifyToken')

router.get('/', verificationToken, getAllFile)
router.post('/create', verificationToken, createFile)
router.delete('/delete/:id', verificationToken, deleteFile)
router.put('/update', verificationToken, updateFile)

router.get('/category/:id_category', getFileByCategory)

module.exports = router