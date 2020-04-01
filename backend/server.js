const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 2000

const ExampleModel = require('./mongoose/models/ExampleModel')

app.get('/api/v1/insert/:text', async (req, res) => {
  const { text } = req.params
  await ExampleModel.create({ text })
  res.json({ text })
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
