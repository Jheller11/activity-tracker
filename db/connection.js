// establish connection to DB
const mongoose = require('mongoose')
mongoose.Promise = Promise

// in production mode, connect to MLAB
let db =
  process.env.NODE_ENV === 'production'
    ? process.env.MLAB_URL
    : 'mongodb://localhost/activity-tracker'

// config
mongoose.connect(db, { useNewUrlParser: true })

// export establish connection
module.exports = mongoose
