const router = require('express').Router()
const User = require('../models/User')
const isLoggedIn = require('../config/utils').isLoggedIn

// post new days numbers
router.post('/:id', isLoggedIn, (req, res, next) => {
  let date = req.body.date.split('-')
  User.findById(req.params.id)
    .then(user => {
      user.data.push({
        date: {
          day: parseInt(date[2]),
          month: parseInt(date[1]),
          year: parseInt(date[0])
        },
        weight: req.body.weight,
        steps: req.body.steps,
        diet: req.body.diet,
        gym: req.body.gym
      })
      user.save()
    })
    .then(() => res.redirect('/tracker'))
    .catch(err => next(err))
})

// get form for posting new entry
router.get('/new', isLoggedIn, (req, res, next) => {
  res.status(200).render('tracker/new')
})

// get data
router.get('/', isLoggedIn, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      res.locals.active = 'tracker'
      res.status(200).render('tracker/tracker')
    })
    .catch(err => next(err))
})

module.exports = router
