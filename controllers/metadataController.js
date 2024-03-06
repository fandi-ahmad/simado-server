const { Metadata } = require('../models')
const { v4: uuidv4 } = require('uuid')
const { resJSON, errorJSON } = require('../repository/resJSON.js')
const { createData, deleteData, updateData } = require('../repository/crudAction.js')

const message = ' metadata successfully'
const getAllMetadata = async (req, res) => {
  try {
    const dataMetadata = await Metadata.findAll()
    resJSON(res, dataMetadata, 'get'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const createMetadata = async (req, res) => {
  try {
    const { field, type } = req.body
    
    createData(Metadata, { field: field, type: type })
    resJSON(res, '', 'create'+message)
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- error create Metadata');
  }
}

const deleteMetadata = async (req, res) => {
  try {
    const { uuid } = req.params

    deleteData(Metadata, uuid)
    resJSON(res, '', 'delete'+message)
  } catch (error) {
    errorJSON(res)
  }
}

const updateMetadata = async (req, res) => {
  try {
    const { uuid, field, type } = req.body

    updateData(Metadata, uuid, { field: field, type: type })
    resJSON(res, '', 'update'+message)    
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllMetadata, createMetadata, deleteMetadata, updateMetadata }