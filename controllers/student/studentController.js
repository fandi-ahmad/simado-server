const { Student, Sequelize, Entry_year, Rapor_file } = require('../../models')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')
const { Op } = require('sequelize')

const message = ' student successfully'

const getAllStudent = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const orderBy = req.query.order || 'updatedAt'
    const orderValue = req.query.order_value || 'DESC'
    const search =  req.query.search || ''

    let queryOptions = {
      order: [[ orderBy, orderValue ]],
      offset: (currentPage - 1) * limit,
      limit: limit
    };


    if (req.query.entry_year) {
      queryOptions.include = [
        {
          model: Entry_year,
          attributes: ['year'], // Hanya ambil kolom 'year' dari Entry_year
          where: { id: req.query.entry_year } // Filter berdasarkan id_entry_year
        }
      ];
    } else {
      queryOptions.include = [
        {
          model: Entry_year,
          attributes: ['year'], // Hanya ambil kolom 'year' dari Entry_year
          where: { id: Sequelize.col('Student.id_entry_year') } // Filter berdasarkan id_entry_year dari Student
        }
      ];
    }
    
    queryOptions.where = {
      [Op.or]: [
        { nisn: { [Op.substring]: search.toLowerCase() } },
        { name: { [Op.substring]: search.toLowerCase() } },
      ]
    };


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
    console.log(error, '<-- errro get student');
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
        return errorJSON(res, 'Pilih tahun masuk terlebih dahulu!', 406)
      }

      if (dataStudent) {
        return errorJSON(res, 'NISN sudah digunakan', 406)
      } else {
        if (req.file) {
          const file_upload = req.file.path
          await createData(Student, {nisn: nisn, name: name, id_entry_year: id_entry_year, ijazah_file: file_upload})
        } else {
          await createData(Student, {nisn: nisn, name: name, id_entry_year: id_entry_year})
        }
        resJSON(res, '', 'create'+message)
      }
    }
  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error create student');
  }
}

const removeFile = (filePath) => {
  // get location image
  filePath = path.join(__dirname, '../..', filePath)

  // remove file by path
  fs.unlink(filePath, err => console.log(err, '<-- error remove file'))
}

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params

    const raporByStudent = await Rapor_file.findOne({
      where: { id_student: id }
    })

    if (raporByStudent) {
      return errorJSON(res, 'Tidak dapat dihapus, karena memiliki data rapor!', 406)
    } else {
      const data = await deleteData(Student, id)
      if (!data) return errorJSON(res, 'Data is not found', 404);
      if (data.ijazah_file) removeFile(data.ijazah_file)
    }

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
    if (existingDataWithNisn) return errorJSON(res, 'NISN sudah digunakan!', 406)

    const dataStudent = await Student.findOne({
      where: { id: id }
    })

    if (req.file) {
      const file_upload = req.file.path

      if (!dataStudent.ijazah_file) {
        dataStudent.ijazah_file = file_upload
      } else {
        removeFile(dataStudent.ijazah_file)
        dataStudent.ijazah_file = file_upload
      }
    }
    
    await updateData(Student, id, {nisn, name, year})
    dataStudent.save()

    resJSON(res, '', 'update'+message)
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllStudent, createStudent, deleteStudent, updateStudent }