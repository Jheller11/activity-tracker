const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        process.nextTick(() => {
          User.findOne({ 'local.email': email }, (err, user) => {
            if (err) return done(err)
            if (user) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'That email is already taken.')
              )
            }
            if (password.length < 8) {
              return done(
                null,
                false,
                req.flash(
                  'signupMessage',
                  'Password must be at least 8 characters.'
                )
              )
            }
            if (password !== req.body.confirmPassword) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'Passwords do not match.')
              )
            }
            if (!email || !req.body.displayName) {
              return done(
                null,
                false,
                req.flash(
                  'signupMessage',
                  'All fields are required. Please try again.'
                )
              )
            } else {
              var newUser = new User()
              newUser.local.email = email
              newUser.local.password = newUser.generateHash(password)
              newUser.local.displayName = req.body.displayName
              newUser.save(err => {
                if (err) throw err
                return done(null, newUser)
              })
            }
          })
        })
      }
    )
  )
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'User not found.')
            )
          }
          if (!user.validPassword(password, user)) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'Password is not correct.')
            )
          }
          return done(null, user)
        })
      }
    )
  )
}
