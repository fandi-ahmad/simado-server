const { File, view_file, Category_file } = require('../models')
const path = require('path')
const fs = require('fs')
const { updateData, createData, deleteData, getData } = require('../repository/crudAction')
const { resJSON, errorJSON } = require('../repository/resJSON.js')


const mesage = ' file successfully'

const getAllFile = async (req, res) => {
  try {
    const dataFile = await getData(view_file)
    resJSON(res, dataFile, 'get'+mesage)
  } catch (error) {
    errorJSON(res)
  }
}

const getFileByCategory = async (req, res) => {
  try {
    const { id_category } = req.params

    const dataCategory = await Category_file.findOne({
      where: { id: id_category }
    })

    console.log(dataCategory, '<-- data category');

    if (!dataCategory) {
      return errorJSON(res, 'this category is not found', 404)
    } else {
      const dataFile = await view_file.findAll({
        where: { id_category: id_category }
      })
  
      resJSON(res, dataFile, 'get file by category successfully')
    }

  } catch (error) {
    errorJSON(res)
  }
}

const createFile = async (req, res) => {
  try {
    const { file_name, id_user, id_category, number, source, format, year } = req.body
    const file_upload = req.file.path

    if (!file_upload) return errorJSON(res, 'please, upload file!!', 400);

    createData(File, {
      file: file_upload,
      file_name: file_name,
      number: number,
      source: source,
      format: format,
      year: year,
      id_user: id_user,
      id_category: id_category
    })

    resJSON(res)
  } catch (error) {
    errorJSON(res)
  }
}

const removeFile = (filePath) => {
  // get location image
  filePath = path.join(__dirname, '..', filePath)

  // remove file by path
  fs.unlink(filePath, err => console.log(err, '<-- error remove image'))
}

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params
    const userFile = await File.findOne({
      where: { id: id }
    })


    if (!userFile) {
      return errorJSON(res, 'data is not found', 404)
    }

    removeFile(userFile.file)
    userFile.destroy()

    resJSON(res)
  } catch (error) {
    return errorJSON(res)
  }
}

const updateFile = async (req, res) => {
  try {
    const { id, file_name, number, source, format, year, id_category } = req.body

    console.log(req.body, '<-- data req.body');

    const dataFile = await File.findOne({
      where: { id: id }
    })

    if (req.file) {
      const file_upload = req.file.path
      if (dataFile.file === '') {
        dataFile.file = file_upload
      } else {
        removeFile(dataFile.file)
        dataFile.file = file_upload
      }
    }

    updateData(File, id, {file_name, number, source, format, year, id_category})

    dataFile.save()

    resJSON(res)
  } catch (error) {
    errorJSON(res)

    console.log(error, '<-- error update file');
  }
}

module.exports = { getAllFile, createFile, deleteFile, updateFile, getFileByCategory }