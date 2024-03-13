const { Class_name } = require('../../models')
const { resJSON, errorJSON } = require('../../repository/resJSON.js.js')
const { deleteData, updateData, createData, getData } = require('../../repository/crudAction.js')

const message = ' class successfully'

const getAllClassName = async (req, res) => {
  try {
    const data = await getData(Class_name, 'ASC')
    resJSON(res, data, 'get'+message)
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

    const data = await deleteData(Class_name, id)
    if (!data) return errorJSON(res, 'data is not found', 404);

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
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