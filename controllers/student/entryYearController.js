const { Entry_year, Student, Sequelize } = require('../../models')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')

const message = ' entry year successfully'

const getAllEntryYear = async (req, res) => {
  try {
    const data = await Entry_year.findAll({
      order: [[ 'year', 'ASC' ]]
    })
    resJSON(res, data, 'get'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const createEntryYear = async (req, res) => {
  try {
    const { year } = req.body

    if (!year) {
      return errorJSON(res, 'Permintaan belum terpenuhi!', 406)
    } else {
      const dataEntryYear = await Entry_year.findOne({
        where: { year: year }
      })

      if (dataEntryYear) {
        return errorJSON(res, 'Tahun masuk sudah digunakan!', 406)
      } else {
        await createData(Entry_year, {year: year})
        resJSON(res, '', 'create'+message)
      }
    }
  } catch (error) {
    errorJSON(res)
  }
}

const deleteEntryYear = async (req, res) => {
  try {
    const { id } = req.params

    const dataStudent = await Student.findOne({
      where: { id_entry_year: id }
    })

    if (dataStudent) {
      return errorJSON(res, 'Tidak dapat dihapus, karena berisi data siswa!', 406);
    } else {
      const data = await deleteData(Entry_year, id)
      if (!data) return errorJSON(res, 'data is not found', 404);
  
      resJSON(res, '', 'delete'+message)
    }

  } catch (error) {
    errorJSON(res)
  }
}

const updateEntryYear = async (req, res) => {
  try {
    const { id, year } = req.body

    // Memeriksa apakah ada data lain yang sama
    const existingData = await Entry_year.findOne({
      where: {
        year: year,
        id: { [Sequelize.Op.not]: id } // Mengabaikan data yang sedang diperbarui
      }
    });
    if (existingData) return errorJSON(res, 'Tahun masuk sudah digunakan!', 406)


    updateData(Entry_year, id, {year})
    resJSON(res, '', 'update'+message)
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllEntryYear, createEntryYear, deleteEntryYear, updateEntryYear }