const mongoose = require('../db/connection.js')

const weightSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Weight', weightSchema)
