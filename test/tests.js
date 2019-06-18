var request = require('supertest'),
  app = require('../index')

describe('Homepage', () => {
  it('responds with 200', done => {
    request(app)
      .get('/')
      .expect(200)
      .expect(/Hello/, done)
  })
})

describe('Login Form', () => {
  it('responds with 200', done => {
    request(app)
      .get('/users/login')
      .expect(200)
      .expect(/Sign In/, done)
  })
})

describe('Create Account Form', () => {
  it('responds with 200', done => {
    request(app)
      .get('/users/signup')
      .expect(200)
      .expect(/Create Account/, done)
  })
})
