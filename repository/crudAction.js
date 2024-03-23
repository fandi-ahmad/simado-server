const { v4: uuidv4 } = require('uuid');

const getData = async (model, order = 'DESC') => {
  const data = await model.findAll({
    order: [[ 'createdAt', order ]]
  })
  return data
}

const createData = async (model, data) => {
  const timeNow = new Date()
  timeNow.setHours(timeNow.getHours() + 8);

  const dataToCreate = {
    id: uuidv4(),
    createdAt: timeNow,
    updatedAt: timeNow,
    ...data
  }

  await model.create(dataToCreate);
}

const deleteData = async (model, idSelected) => {
  const dataById = await model.findOne({
    where: { id: idSelected }
  })

  // validation if data is not found
  if (!dataById) {
    return null
  } else {
    await dataById.destroy()
    return dataById
  }

}

const updateData = async (model, idSelected, data) => {
  const timeNow = new Date()
  timeNow.setHours(timeNow.getHours() + 8);

  const dataById = await model.findOne({
    where: { id: idSelected }
  })

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      dataById[key] = data[key];
    }
  }
  dataById.updatedAt = timeNow  // not working

  await dataById.save()
}

module.exports = { deleteData, updateData, createData, getData }