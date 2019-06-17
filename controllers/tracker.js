const router = require('express').Router()
const User = require('../models/User')
const isLoggedIn = require('../config/utils').isLoggedIn

router.get('/', isLoggedIn, (req, res, next) => {
  res.locals.active = 'tracker'
  res.status(200).render('tracker')
})

module.exports = router
