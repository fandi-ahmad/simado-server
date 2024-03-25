const router = require("express").Router()
const { getAllStudent, createStudent, deleteStudent, updateStudent } = require('../controllers/student/studentController')
const { getAllStudyYear, createStudyYear, deleteStudyYear, updateStudyYear, getStudyYearById } = require('../controllers/student/studyYearController')
const { getAllClassName, createClassName, deleteClassName, updateClassName, getClassNameById } = require('../controllers/student/classNameController')
const { getAllEntryYear, createEntryYear, deleteEntryYear, updateEntryYear } = require('../controllers/student/entryYearController')

// student
router.get('/', getAllStudent)
router.post('/create', createStudent)
router.delete('/delete/:id', deleteStudent)
router.put('/update', updateStudent)

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

// student/entry-year
router.get('/entry-year/', getAllEntryYear)
router.post('/entry-year/create', createEntryYear)
router.delete('/entry-year/delete/:id', deleteEntryYear)
router.put('/entry-year/update', updateEntryYear)

module.exports = router