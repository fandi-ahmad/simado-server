const { Student, Sequelize, Entry_year } = require('../../models')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')

const message = ' student successfully'

const getAllStudent = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const orderBy = req.query.order || 'updatedAt'
    const orderValue = req.query.order_value || 'DESC'

    let queryOptions = {
      order: [[ orderBy, orderValue ]],
      offset: (currentPage - 1) * limit,
      limit: limit
    };


    if (req.query.entry_year) {
      queryOptions.where = { id_entry_year: req.query.entry_year };
    }

    const { count, rows } = await Student.findAndCountAll(queryOptions);

    const result = {
      status: 200,
      message: 'get student successfully',
      page: currentPage,
      limit: limit,
      total_page: Math.ceil(count/limit),
      total_data: count,
      data: rows,
    }
    res.status(200).json(result)
  } catch (error) {
    errorJSON(res)
  }
}

const createStudent = async (req, res) => {
  try {
    const { nisn, name, id_entry_year = '' } = req.body

    if (!nisn || !name) {
      return errorJSON(res, 'request has not been fulfilled', 406)
    } else {
      const dataStudent = await Student.findOne({
        where: { nisn: nisn }
      })

      const dataEntryYear = await Entry_year.findOne({
        where: { id: id_entry_year }
      })

      if (!dataEntryYear) {
        return errorJSON(res, 'Pilih tahun masuk terlebih dahulu', 406)
      }

      if (dataStudent) {
        return errorJSON(res, 'NISN sudah digunakan', 406)
      } else {
        await createData(Student, {nisn: nisn, name: name, id_entry_year: id_entry_year})
        resJSON(res, '', 'create'+message)
      }
    }
  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error create student');
  }
}

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params

    const data = await deleteData(Student, id)
    if (!data) return errorJSON(res, 'data is not found', 404);

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const updateStudent = async (req, res) => {
  try {
    const { id, nisn, name, year } = req.body

    const dataToUpdate = await Student.findByPk(id);
    if (!dataToUpdate) return errorJSON(res, 'Data is not found', 404)

    // Memeriksa apakah ada data lain dengan nisn yang sama
    const existingDataWithNisn = await Student.findOne({
      where: {
        nisn: nisn,
        id: { [Sequelize.Op.not]: id } // Mengabaikan data yang sedang diperbarui
      }
    });
    if (existingDataWithNisn) return errorJSON(res, 'NISN is already in use', 406)
    
    updateData(Student, id, {nisn, name, year})
    resJSON(res, '', 'update'+message)
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllStudent, createStudent, deleteStudent, updateStudent }