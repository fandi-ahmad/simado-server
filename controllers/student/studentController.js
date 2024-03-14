const { Student, Sequelize } = require('../../models')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')

const message = ' student successfully'

const getAllStudent = async (req, res) => {
  try {
    const dataStudent = await getData(Student)
    resJSON(res, dataStudent, 'get'+message) 
  } catch (error) {
    errorJSON(res)
  }
}

const createStudent = async (req, res) => {
  try {
    const { nisn, name, year } = req.body

    if (!nisn || !name || !year) {
      return errorJSON(res, 'request has not been fulfilled', 400)
    } else {
      const dataStudent = await Student.findOne({
        where: { nisn: nisn }
      })
      if (dataStudent) {
        return errorJSON(res, 'NISN is already in use', 406)
      } else {
        await createData(Student, {nisn: nisn, name: name, year: year})
        resJSON(res, '', 'create'+message)
      }
    }
  } catch (error) {
    errorJSON(res)
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