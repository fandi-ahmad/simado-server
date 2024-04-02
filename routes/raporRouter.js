const router = require("express").Router()
const { getAllRapor, createRapor, deleteRapor, updateRapor } = require('../controllers/student/studentRaporController')
const { verificationToken } = require('../middleware/verifyToken')

// student/rapor
router.get('/', verificationToken, getAllRapor)
router.post('/create', verificationToken, createRapor)
router.delete('/delete/:id', verificationToken, deleteRapor)
router.put('/update', verificationToken, updateRapor)

module.exports = router