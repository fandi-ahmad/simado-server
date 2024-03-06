const resJSON = (res, data = null, message = 'success', status = 200) => {
  res.status(status).json({
    status: status,
    message: message,
    data: data
  })
}

const errorJSON = (res, message = 'Internal server error', status = 500) => {
  res.status(status).json({
    status: status,
    message: message,
  })
}

module.exports = { resJSON, errorJSON }