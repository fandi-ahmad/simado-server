const router = require("express").Router()
const { getAllStudent, createStudent, deleteStudent, updateStudent } = require('../controllers/studentController')
const { getAllStudentFile, createStudentFile, deleteStudentFile, updateStudentFile } = require('../controllers/studentFileController')
const { getAllStudyYear, createStudyYear, deleteStudyYear, updateStudyYear, getStudyYearById } = require('../controllers/studyYearController')
const { getAllClassName, createClassName, deleteClassName, updateClassName, getClassNameById } = require('../controllers/classNameController')

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

// student/study (year)
router.get('/study/', getAllStudyYear)
router.get('/study/:id', getStudyYearById)
router.post('/study/create', createStudyYear)
router.delete('/study/delete/:id', deleteStudyYear)
router.put('/study/update', updateStudyYear)

// student/class
router.get('/class/', getAllClassName)
router.get('/class/:id', getClassNameById)
router.post('/class/create', createClassName)
router.delete('/class/delete/:id', deleteClassName)
router.put('/class/update', updateClassName)

module.exports = router