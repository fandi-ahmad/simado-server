const router = require("express").Router()
const { getAllStudent, createStudent, deleteStudent, updateStudent } = require('../controllers/studentController')
const { getAllStudentFile, createStudentFile, deleteStudentFile, updateStudentFile } = require('../controllers/studentFileController')

// student
router.get('/', getAllStudent)
router.post('/create', createStudent)
router.delete('/delete/:id', deleteStudent)
router.put('/update', updateStudent)

// student/file
router.get('/file/', getAllStudentFile)
router.post('/file/create', createStudentFile)
router.delete('/file/delete/:id', deleteStudentFile)
router.put('/file/update', updateStudentFile)

module.exports = router