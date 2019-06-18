var request = require('supertest'),
  app = require('../index')

// Homepage check that app responds with 200 'ok' status
describe('Homepage', () => {
  it('responds with 200', done => {
    request(app)
      .get('/')
      .expect(200)
      .expect(/Hello/, done)
  })
})

// Login Form check that responds with 200 'ok' status
describe('Login Form', () => {
  it('responds with 200 and display login form', done => {
    request(app)
      .get('/users/login')
      .expect(200)
      .expect(/Sign In/, done)
  })
  it('rejects when user email not found', done => {
    request(app)
      .post('/users/login')
      .type('form')
      .send({
        email: 'testuserx',
        password: 'test'
      })
      .expect(302)
      .expect('Location', /\/login/, done)
  })
  it('rejects when user password is not correct', done => {
    request(app)
      .post('/users/login')
      .type('form')
      .send({
        email: 'testuser1',
        password: 'testuser2'
      })
      .expect(302)
      .expect('Location', /\/login/, done)
  })
  it('accepts and redirects on successful login', done => {
    request(app)
      .post('/users/login')
      .type('form')
      .send({
        email: 'testuser1',
        password: 'testuser1'
      })
      .expect(302)
      .expect('Location', /\/tracker/, done)
  })
})

// Create account form displays and handles registration errors
describe('Create Account Form', () => {
  it('responds with 200 and display sign up form', done => {
    request(app)
      .get('/users/signup')
      .expect(200)
      .expect(/Create Account/, done)
  })
  it('rejects password when too short', done => {
    request(app)
      .post('/users/signup')
      .type('form')
      .send({
        email: 'testuserx',
        displayName: 'Tester',
        password: 'test',
        confirmPassword: 'test'
      })
      .expect(302)
      .expect('Location', /\/signup/, done)
  })
  it('rejects when passwords do not match', done => {
    request(app)
      .post('/users/signup')
      .type('form')
      .send({
        email: 'testuserx',
        displayName: 'Tester',
        password: 'testpassword',
        confirmPassword: 'passwordtest'
      })
      .expect(302)
      .expect('Location', /\/signup/, done)
  })
  it('rejects name is not provided', done => {
    request(app)
      .post('/users/signup')
      .type('form')
      .send({
        email: 'testuserx',
        displayName: '',
        password: 'testpassword',
        confirmPassword: 'testpassword'
      })
      .expect(302)
      .expect('Location', /\/signup/, done)
  })
  it('rejects when email is not provided', done => {
    request(app)
      .post('/users/signup')
      .type('form')
      .send({
        email: '',
        displayName: 'Tester',
        password: 'testpassword',
        confirmPassword: 'testpassword'
      })
      .expect(302)
      .expect('Location', /\/signup/, done)
  })
  it('rejects when email is already taken', done => {
    request(app)
      .post('/users/signup')
      .type('form')
      .send({
        email: 'testuser1',
        displayName: 'test',
        password: 'testuser1',
        confirmPassword: 'testuser1'
      })
      .expect(302)
      .expect('Location', /\/signup/, done)
  })
})

// TODO -> add more tests for signup successful, logout, add data, edit data, delete data
