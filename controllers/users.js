const router = require('express').Router()
const passport = require('passport')
require('../config/passport')(passport)

router.get('/login', (req, res, next) => {
  res.render('users/login', { message: req.flash('loginMessage') })
})

router.get('/signup', (req, res, next) => {
  res.render('users/signup', { message: req.flash('signupMessage') })
})

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/tracker',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/tracker',
    failureRedirect: '/users/signup',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
