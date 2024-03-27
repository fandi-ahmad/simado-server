const { Class_name, Sequelize, View_rapor_file, Rapor_file } = require('../../models')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')

const message = ' class successfully'

const getAllClassName = async (req, res) => {
  try {
    const { id_study_year } = req.query || ''

    const data = await Class_name.findAll({
      order: [[ 'class_name', 'ASC' ]]
    })

    let whereCondition = {};

    if (id_study_year) {
      whereCondition = { id_study_year }; // Sesuaikan dengan nama kolom di tabel View_rapor_file
    }

    const raporCount = await View_rapor_file.findAndCountAll({
      attributes: ['class_name', [Sequelize.fn('COUNT', Sequelize.col('class_name')), 'total']],
      group: ['class_name'],
      where: whereCondition
    })

    let countsMap = {};
    raporCount.count.map(item => {
      countsMap[item.class_name] = item.count
    })

    const dataWithRaporCount = data.map(item => ({
      ...item.toJSON(),
      count: countsMap[item.class_name] || 0 // Menggunakan nilai count dari countsMap atau 0 jika tidak ada
    }));

    const resDataJson = {
      status: 200,
      message: 'ok',
      data: dataWithRaporCount,
    }

    res.status(200).json(resDataJson)
  } catch (error) {
    errorJSON(res)
  }
}

const getClassNameById = async (req, res) => {
  try {
    const { id } = req.params
    
    const data = await Class_name.findOne({
      where: { id: id }
    })

    if (data) {
      resJSON(res, data, 'get'+message) 
    } else {
      return errorJSON(res, 'data is not found', 404)
    }

  } catch (error) {
    errorJSON(res)
  }
}

const createClassName = async (req, res) => {
  try {
    const { class_name } = req.body

    if (!class_name) {
      return errorJSON(res, 'study year is empty', 400)
    } else {
      await createData(Class_name, {class_name: class_name})
      resJSON(res, '', 'create'+message)
    }
  } catch (error) {
    errorJSON(res)
  }
}

const deleteClassName = async (req, res) => {
  try {
    const { id } = req.params

    const dataRapor = await Rapor_file.findOne({
      where: { id_class_name: id }
    })

    if (dataRapor) {
      return errorJSON(res, 'Tidak dapat dihapus, karena memiliki data rapor siswa!', 406)
    } else {
      const data = await deleteData(Class_name, id)
      if (!data) return errorJSON(res, 'data is not found', 404);
    }

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error delete class name');
  }
}

const updateClassName = async (req, res) => {
  try {
    const { id, class_name } = req.body
    updateData(Class_name, id, {class_name})
    resJSON(res, '', 'update'+message)
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllClassName, createClassName, deleteClassName, updateClassName, getClassNameById }