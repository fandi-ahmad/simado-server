const { Student_file } = require('../models')
const { resJSON, errorJSON } = require('../repository/resJSON.js')
const { deleteData, updateData, createData, getData } = require('../repository/crudAction.js')
const path = require('path')
const fs = require('fs')
const message = ' student file successfully'

const getAllStudentFile = async (req, res) => {
  try {
    const { id_study_year, id_class_name } = req.body

    if (id_study_year && id_class_name) {
      const dataStudentFile = await Student_file.findAll({
        where: {
          id_study_year: id_study_year,
          id_class_name: id_class_name
        }
      })
      resJSON(res, dataStudentFile, 'get'+message)

    } else {
      const dataStudentFile = await getData(Student_file)
      resJSON(res, dataStudentFile, 'get'+message)

    }
  } catch (error) {
    errorJSON(res)
  }
}

const createStudentFile = async (req, res) => {
  try {
    const { id_student, id_study_year, id_class_name, file_name, semester, category } = req.body

    if (!id_student || !id_student || !id_class_name || !file_name || !category || !req.file) {
      return errorJSON(res, 'request has not been fulfilled', 400)
    } else {
      const file_upload = req.file.path

      await createData(Student_file, {
        id_student: id_student,
        id_study_year: id_study_year,
        id_class_name: id_class_name,
        file: file_upload,
        file_name: file_name,
        semester: semester,
        category: category
      })
      resJSON(res, '', 'create'+message)
    }
  } catch (error) {
    errorJSON(res)
  }
}

const removeFile = (filePath) => {
  // get location image
  filePath = path.join(__dirname, '..', filePath)

  // remove file by path
  fs.unlink(filePath, err => console.log(err, '<-- error remove file'))
}

const deleteStudentFile = async (req, res) => {
  try {
    const { id } = req.params

    const data = await deleteData(Student_file, id)
    if (!data) return errorJSON(res, 'data is not found', 404);
    
    removeFile(data.file)

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const updateStudentFile = async (req, res) => {
  try {
    const { id, id_student, file_name, classes, semester } = req.body

    if (!id_student || !file_name || !classes || !semester) {
      return errorJSON(res, 'request has not been fulfilled', 400)
    } else {

      const dataStudentFile = await Student_file.findOne({
        where: { id: id }
      })
  
      if (req.file) {
        const file_upload = req.file.path
        if (dataStudentFile.file === '') {
          dataStudentFile.file = file_upload
        } else {
          removeFile(dataStudentFile.file)
          dataStudentFile.file = file_upload
        }
      }

      dataStudentFile.class = classes
      await updateData(Student_file, id, { id_student, file_name, semester })

      dataStudentFile.save()
      
      resJSON(res, '', 'update'+message)
    }
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllStudentFile, createStudentFile, deleteStudentFile, updateStudentFile }