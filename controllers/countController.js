const { view_file, Student, User, Sequelize } = require('../models')
const { errorJSON, resJSON } = require('../repository/resJSON.js')

const getAllCount = async (req, res) => {
  try {
    const dataFile = await view_file.findAndCountAll()

    const dataFileByCategory = await view_file.findAll({
      attributes: ['category_name', [Sequelize.fn('COUNT', Sequelize.col('category_name')), 'total']],
      group: ['category_name']
    });
    
    const dataStudent = await Student.findAndCountAll()
    const dataUser = await User.findAndCountAll()

    const data = {
      file: dataFile.count,
      file_category: dataFileByCategory,
      student: dataStudent.count,
      user: dataUser.count,
    }
    resJSON(res, data)
  } catch (error) {
    errorJSON(res)
  }
}

module.exports = { getAllCount }