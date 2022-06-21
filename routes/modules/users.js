// Assign variables
const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// Route for login page
router.get('/login', (req, res) => res.render('login'))

// Route for register page
router.get('/register', (req, res) => { res.render('register') })

// Route for user register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) return res.render('register', {
    errors,
    name,
    email,
    password,
    confirmPassword
  })
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了!' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => (console.log(err)))
})


module.exports = router