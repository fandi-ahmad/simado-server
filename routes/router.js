const router = require("express").Router()
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const fileRouter = require('./fileRouter')
const categoryRouter = require('./categoryRouter')
const metadataRouter = require('./metadataRouter')
const studentRouter = require('./studentRouter')
const countRouter = require('./countRouter')

const raporRouter = require('./raporRouter')

router.use('/api/v1/user', userRouter)
router.use('/api/v1/auth', authRouter)
router.use('/api/v1/file', fileRouter)
router.use('/api/v1/category', categoryRouter)
router.use('/api/v1/metadata',  metadataRouter)
router.use('/api/v1/student', studentRouter)
router.use('/api/v1/count', countRouter)

router.use('/api/v1/rapor', raporRouter)

module.exports = router