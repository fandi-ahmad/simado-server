const router = require("express").Router()
const { getAllStudent, createStudent, deleteStudent, updateStudent } = require('../controllers/student/studentController')
const { getAllStudyYear, createStudyYear, deleteStudyYear, updateStudyYear, getStudyYearById } = require('../controllers/student/studyYearController')
const { getAllClassName, createClassName, deleteClassName, updateClassName, getClassNameById } = require('../controllers/student/classNameController')
const { getAllEntryYear, createEntryYear, deleteEntryYear, updateEntryYear } = require('../controllers/student/entryYearController')
const { verificationToken } = require('../middleware/verifyToken')

// student
router.get('/', verificationToken, getAllStudent)
router.post('/create', verificationToken, createStudent)
router.delete('/delete/:id', verificationToken, deleteStudent)
router.put('/update', verificationToken, updateStudent)

// student/study (year)
router.get('/study/', verificationToken, getAllStudyYear)
router.get('/study/:id', verificationToken, getStudyYearById)
router.post('/study/create', verificationToken, createStudyYear)
router.delete('/study/delete/:id', verificationToken, deleteStudyYear)
router.put('/study/update', verificationToken, updateStudyYear)

// student/class
router.get('/class/', verificationToken, getAllClassName)
router.get('/class/:id', verificationToken, getClassNameById)
router.post('/class/create', verificationToken, createClassName)
router.delete('/class/delete/:id', verificationToken, deleteClassName)
router.put('/class/update', verificationToken, updateClassName)

// student/entry-year
router.get('/entry-year/', verificationToken, getAllEntryYear)
router.post('/entry-year/create', verificationToken, createEntryYear)
router.delete('/entry-year/delete/:id', verificationToken, deleteEntryYear)
router.put('/entry-year/update', verificationToken, updateEntryYear)

module.exports = router