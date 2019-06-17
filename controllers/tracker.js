const router = require('express').Router()
const User = require('../models/User')
const isLoggedIn = require('../config/utils').isLoggedIn

// post new days numbers
router.post('/:id', isLoggedIn, (req, res, next) => {
  console.log(req.body)
  res.status(200).render('tracker')
})

// get data
router.get('/', isLoggedIn, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      res.locals.active = 'tracker'
      res.status(200).render('tracker')
    })
    .catch(err => next(err))
})

module.exports = router
