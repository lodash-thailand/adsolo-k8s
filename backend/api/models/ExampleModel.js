const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExampleSchema = new Schema({
  text: { type: String }
}, { timestamps: true, collection: 'example' })

const ExampleModel = mongoose.model('Example', ExampleSchema)

module.exports = ExampleModel
