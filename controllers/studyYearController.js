const { Study_year } = require('../models')
const { resJSON, errorJSON } = require('../repository/resJSON.js')
const { deleteData, updateData, createData, getData } = require('../repository/crudAction.js')

const message = ' study year successfully'

const getAllStudyYear = async (req, res) => {
  try {
    const data = await getData(Study_year, 'ASC')
    resJSON(res, data, 'get'+message) 
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

    const data = await deleteData(Study_year, id)
    if (!data) return errorJSON(res, 'data is not found', 404);

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
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