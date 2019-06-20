const router = require('express').Router()
const User = require('../models/User')
const isLoggedIn = require('../config/utils').isLoggedIn

// post new days numbers
router.post('/', isLoggedIn, (req, res, next) => {
  let date = req.body.date.split('-')
  User.findById(req.user.id)
    .then(user => {
      user.data.unshift({
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
      // TODO -> sort data by date before saving back to user
      user.save()
    })
    .then(() => res.redirect('/tracker'))
    .catch(err => next(err))
})

// find a delete a data entry from User's records
router.delete('/:id', isLoggedIn, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      user.data = user.data.filter(day => day.id !== req.params.id)
      user.save()
    })
    .then(() => res.redirect('/tracker'))
    .catch(err => next(err))
})

// get form for posting new entry
router.get('/new', isLoggedIn, (req, res, next) => {
  res.status(200).render('tracker/new')
})
// TODO => format this new entry form

// get form for editing entry
router.get('/edit/:id', isLoggedIn, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      let target = user.data.find(day => day.id === req.params.id)
      if (target) res.render('tracker/edit', { entry: target })
      else res.redirect('/tracker')
    })
    .catch(err => next(err))
})
// TODO => format this edit entry form

// TODO => add put route for editing previous entry

// get data
router.get('/', isLoggedIn, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      res.locals.active = 'tracker'
      res.status(200).render('tracker/tracker')
    })
    .catch(err => next(err))
})
// TODO => tracker calculations, updates, totals, presentation, UI

module.exports = router
