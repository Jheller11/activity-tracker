const mongoose = require('../db/connection.js')

const daySchema = new mongoose.Schema({
  date: {
    month: {
      type: Number,
      required: true
    },
    day: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  weight: {
    type: Number,
    required: true
  },
  steps: {
    type: Number,
    default: 0
  },
  gym: {
    type: Number,
    default: 0
  },
  diet: {
    type: Number,
    default: 0
  }
})

module.exports = daySchema
