const express = require('express')
const app = express()
const router = require('./routes/router')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { config } = require('dotenv')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const { fileStorage } = require('./middleware/filterFile')


config()
const port = process.env.SIMADO_PORT_SERVER || 8000
const corsOptions = {
  origin: process.env.SIMADO_FRONTEND_CORS,
  credentials: true, 
};

app.use(cors(corsOptions))
app.use(cookieParser());
// app.use(express.json())
app.use(bodyParser.json());
app.use('/files', express.static(path.join(__dirname, 'files')))
app.use(multer({storage: fileStorage}).single('file_upload'))
app.use(router)

app.listen(port, () => {
  console.log(`simado server listening on port ${port}`)
})