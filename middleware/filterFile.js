const { diskStorage } = require('multer')

const fileStorage = diskStorage({
    // lokasi file
    destination: (req, file, cb) => {
        cb(null, 'files')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const filterFormat = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null,  false)
    }
}

module.exports = { fileStorage, filterFormat }