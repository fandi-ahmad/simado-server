const router = require("express").Router()
const { getAllMetadata, createMetadata, deleteMetadata, updateMetadata} = require('../controllers/metadataController')

router.get('/', getAllMetadata)
router.post('/create', createMetadata)
router.delete('/delete/:uuid', deleteMetadata)
router.put('/update', updateMetadata)

module.exports = router