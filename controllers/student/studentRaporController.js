const { Rapor_file, View_rapor_file } = require('../../models/index.js')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')
const path = require('path')
const fs = require('fs')
const { Op } = require('sequelize')
const message = ' student file successfully'

const getAllRapor = async (req, res) => {
  try {
    const { id_study_year, id_class_name, semester } = req.query || null
    const currentPage = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const orderBy = req.query.order || 'updatedAt'
    const orderValue = req.query.order_value || 'DESC'
    const search =  req.query.search || ''

    if (id_study_year && id_class_name) {
      const { count, rows } = await View_rapor_file.findAndCountAll({
        where: {
          id_study_year: id_study_year,
          id_class_name: id_class_name,
          semester: semester,
          [Op.or]: [
            { nisn: { [Op.substring]: search.toLowerCase() } },
            { student_name: { [Op.substring]: search.toLowerCase() } },
          ]
        },
        order: [[ orderBy, orderValue ]],
        offset: (currentPage - 1) * limit,
        limit: limit
      })

      const result = {
        status: 200,
        message: 'get student file successfully',
        page: currentPage,
        limit: limit,
        total_page: Math.ceil(count/limit),
        total_data: count,
        data: rows,
      }
      res.status(200).json(result)
    } else {
      const dataStudentFile = await getData(View_rapor_file)
      resJSON(res, dataStudentFile, 'get'+message)
    }

  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error get rapor');
  }
}

const createRapor = async (req, res) => {
  try {
    const { id_student, id_study_year, id_class_name, semester } = req.body

    if (!id_student || !id_study_year || !id_class_name || !semester) {
      return errorJSON(res, 'request has not been fulfilled', 406)
    } else {

      if (req.file) {
        const file_upload = req.file.path

        await createData(Rapor_file, {
          id_student: id_student,
          id_study_year: id_study_year,
          id_class_name: id_class_name,
          file: file_upload,
          semester: semester,
        })
        resJSON(res, '', 'create'+message)
      } else {
        await createData(Rapor_file, {
          id_student: id_student,
          id_study_year: id_study_year,
          id_class_name: id_class_name,
          semester: semester,
        })
        resJSON(res, '', 'create'+message)
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

const deleteRapor = async (req, res) => {
  try {
    const { id } = req.params

    const data = await deleteData(Rapor_file, id)
    if (!data) return errorJSON(res, 'data is not found', 404);
    if (data.file) removeFile(data.file)

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const updateRapor = async (req, res) => {
  try {
    const { id, id_student, id_study_year, id_class_name, semester } = req.body

    if (!id_student || !id_study_year) {
      return errorJSON(res, 'request has not been fulfilled', 406)
    } else {

      const dataStudentFile = await Rapor_file.findOne({
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

      await updateData(Rapor_file, id, { id_student, id_study_year, id_class_name, semester })

      dataStudentFile.save()
      
      resJSON(res, '', 'update'+message)
    }
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllRapor, createRapor, deleteRapor, updateRapor }