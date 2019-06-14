// require packages
const express = require('express')
const app = express()
const override = require('method-override')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()
const path = require('path')
const favicon = require('serve-favicon')
// /require packages

// config middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
// app.use(favicon(path.join(__dirname, 'public', 'media', 'favicon.ico')))
// /config middleware

// import controllers

// /import controllers

// view engine
app.set('views', './views')
app.set('view engine', 'pug')
// /view engine

// custom middleware for title and user
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.title = 'Activity Tracker'
  next()
})
// /custom middleware for title and user

// assign controller

// /assign controller

// set port
app.set('port', process.env.PORT || 4001)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)
// /set port
