const { Category_file, File } = require('../models')
const { resJSON, errorJSON } = require('../repository/resJSON.js')
const { deleteData, updateData, createData } = require('../repository/crudAction.js')

const message = ' category successfully'

const getAllCategory = async (req, res) => {
  try {
    const dataCategory = await Category_file.findAll({
      order: [[ 'createdAt', 'DESC' ]]
    })
    resJSON(res, dataCategory, 'get'+message) 
  } catch (error) {
    errorJSON(res)
  }
}

const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return errorJSON(res, 'category name is empty', 400)
    } else {
      await createData(Category_file, {name: name})
      resJSON(res, '', 'create'+message)
    }

    // !name ? resJSON(res, '', 'category name is empty', 400) :
  } catch (error) {
    errorJSON(res)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    const dataFile = await File.findOne({
      where: { id_category: id },
    })

    // validate category if was use in file
    if (dataFile) {
      return errorJSON(res, 'this category was use in file', 405)
    } else {
      const data = await deleteData(Category_file, id)
      if (!data) return errorJSON(res, 'data is not found', 404);
    }

    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const updateCategory = async (req, res) => {
  try {
    const { uuid, name } = req.body
    updateData(Category_file, uuid, {name})
    resJSON(res, '', 'update'+message)
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllCategory, createCategory, deleteCategory, updateCategory }