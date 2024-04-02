const { Student_file, View_student_file } = require('../../models/index.js')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')
const path = require('path')
const fs = require('fs')
const message = ' ijazah successfully'

const getAllIjazah = async (req, res) => {
  try {
    const { entry_year } = req.body
    const data = await View_student_file.findAll({
      where: {
        category: 'ijazah'
      }
    })

    resJSON(res, data)

  } catch (error) {
    errorJSON(res)
  }
}

const createIjazah = async (req, res) => {
  try {
    const { id_student, file_name } = req.body

    if (!id_student) {
      return errorJSON(res, 'permintaan belum terpenuhi', 406)
    } else {

      if (req.file) {
        const file_upload = req.file.path

        await createData(Student_file, {
          id_student: id_student,
          file: file_upload,
          file_name: file_name,
          category: 'ijazah'
        })
        resJSON(res, '', 'create'+message)
      } else {
        return errorJSON(res, 'permintaan file belum terpenuhi', 406)
      }
      
    }

  } catch (error) {
    errorJSON(res)
  }
}

const removeFile = (filePath) => {
  // get location image
  filePath = path.join(__dirname, '../..', filePath)

  // remove file by path
  fs.unlink(filePath, err => console.log(err, '<-- error remove file'))
}

const deleteIjazah = async (req, res) => {
  try {
    const { id } = req.params

    const data = await deleteData(Student_file, id)
    if (!data) return errorJSON(res, 'data is not found', 404);
    if (data.file) removeFile(data.file)

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const updateIjazah = async (req, res) => {
  try {
    const { id, id_student, file_name } = req.body

    if (!id_student) {
      return errorJSON(res, 'permintaan belum terpenuhi', 406)
    } else {

      const dataStudentFile = await Student_file.findOne({
        where: { id: id }
      })
  
      if (req.file) {
        const file_upload = req.file.path

        if (!dataStudentFile.file) {
          dataStudentFile.file = file_upload
        } else {
          removeFile(dataStudentFile.file)
          dataStudentFile.file = file_upload
        }
      }

      await updateData(Student_file, id, { id_student, file_name })

      dataStudentFile.save()
      
      resJSON(res, '', 'update'+message)
    }
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllIjazah, createIjazah, deleteIjazah, updateIjazah }