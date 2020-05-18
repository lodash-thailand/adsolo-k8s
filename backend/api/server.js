const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 2000

const ExampleModel = require('./models/ExampleModel')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})
const uploader = multer({ storage: storage })

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

require('./healthCheck')(app)

app.get('/api/v1/insert/:text', async (req, res) => {
  const { text } = req.params
  await ExampleModel.create({ text })
  res.json({ text })
})

app.post('/api/v1/examples', uploader.single('fileInput'), async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body))
    if (!data.text || !req.file) {
      throw new Error('Bad request')
    }

    const example = await ExampleModel.create({ text: data.text })
    const oldPath = `./public/images/${req.file.filename}`
    const newPath = `./public/uploads/${example._id}.jpg`

    fs.rename(oldPath, newPath, (error) => {
      if (error.code === 'EXDEV') {
        copy(oldPath, newPath, (data) => {
          console.log(data)
        })
      }
    })

    return res.json({ result: true, data: example })
  } catch (error) {
    console.log(error)
    res.status(400).json({ result: false })
  }
})

app.get('/api/v1/examples', async (req, res) => {
  const response = await ExampleModel.find({})
  res.json({ result: response })
})

app.get('/api/v1/examples/:id', async (req, res) => {
  const { id } = req.params
  const response = await ExampleModel.findOne({ _id: id })
  res.json({ result: response })
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

function copy (oldPath, newPath, callback) {
  var readStream = fs.createReadStream(oldPath)
  var writeStream = fs.createWriteStream(newPath)

  readStream.on('error', callback)
  writeStream.on('error', callback)

  readStream.on('close', function () {
    fs.unlink(oldPath, callback)
  })

  readStream.pipe(writeStream)
}

// การ Warning ต่าง ๆ https://mongoosejs.com/docs/deprecations.html
const mongooseConfig = {
  useFindAndModify: false, // ให้ใช้ findOneAndUpdate แล้วไม่แจ้งเตือน
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_SERVER, mongooseConfig)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => { console.log('mongoose connected!') })
