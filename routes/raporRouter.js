const router = require("express").Router()
const { getAllRapor, createRapor, deleteRapor, updateRapor } = require('../controllers/student/studentRaporController')

// student/rapor
router.get('/', getAllRapor)
router.post('/create', createRapor)
router.delete('/delete/:id', deleteRapor)
router.put('/update', updateRapor)

module.exports = router