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
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
// /require packages

// config middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
// app.use(favicon(path.join(__dirname, 'public', 'media', 'favicon.ico')))
// /config middleware

// config Passport
app.use(
  session({ secret: 'secretstringss', resave: false, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// /config Passport

// import controllers
const userController = require('./controllers/users')
const trackerController = require('./controllers/tracker')
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
app.use('/users', userController)
app.use('/tracker', trackerController)
// /assign controller

// routes
app.get('/contact', (req, res, next) => {
  res.locals.active = ''
  res.status(200).render('contact')
})

app.get('/', (req, res, next) => {
  res.locals.active = 'home'
  res.status(200).render('home')
})
// /routes

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})
// /error handler

// set port
app.set('port', process.env.PORT || 4001)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)
// /set port

module.exports = app
