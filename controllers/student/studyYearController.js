const { Study_year, View_rapor_file, Sequelize } = require('../../models/index.js')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')

const message = ' study year successfully'

const getAllStudyYear = async (req, res) => {
  try {
    const data = await Study_year.findAll({
      order: [[ 'study_year', 'ASC' ]]
    })

    const raporCount = await View_rapor_file.findAndCountAll({
      attributes: ['study_year', [Sequelize.fn('COUNT', Sequelize.col('study_year')), 'total']],
      group: ['study_year']
    })

    let countsMap = {};
    raporCount.count.map(item => {
      countsMap[item.study_year] = item.count
    })

    const dataWithRaporCount = data.map(item => ({
      ...item.toJSON(),
      count: countsMap[item.study_year] || 0 // Menggunakan nilai count dari countsMap atau 0 jika tidak ada
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

const getStudyYearById = async (req, res) => {
  try {
    const { id } = req.params
    
    const data = await Study_year.findOne({
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

const createStudyYear = async (req, res) => {
  try {
    const { study_year } = req.body

    if (!study_year) {
      return errorJSON(res, 'study year is empty', 400)
    } else {
      await createData(Study_year, {study_year: study_year})
      resJSON(res, '', 'create'+message)
    }
  } catch (error) {
    errorJSON(res)
  }
}

const deleteStudyYear = async (req, res) => {
  try {
    const { id } = req.params

    const dataRapor = await View_rapor_file.findOne({
      where: { id_study_year: id }
    })

    if (dataRapor) {
      return errorJSON(res, 'Tidak dapat dihapus, karena memiliki data rapor siswa!', 406)
    } else {
      const data = await deleteData(Study_year, id)
      if (!data) return errorJSON(res, 'data is not found', 404);
    }


    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error delete study year');
  }
}

const updateStudyYear = async (req, res) => {
  try {
    const { id, study_year } = req.body
    updateData(Study_year, id, {study_year})
    resJSON(res, '', 'update'+message)
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllStudyYear, createStudyYear, deleteStudyYear, updateStudyYear, getStudyYearById }