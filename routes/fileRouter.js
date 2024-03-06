const router = require("express").Router()
const { getAllFile, createFile, deleteFile, updateFile } = require('../controllers/fileControllers')

router.get('/', getAllFile)
router.post('/create', createFile)
router.delete('/delete/:id', deleteFile)
router.put('/update', updateFile)

module.exports = router