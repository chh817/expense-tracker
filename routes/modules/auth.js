// Assign variables
const express = require('express')

const router = express.Router()

const passport = require('passport')

// Route for fb user login
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))

// Route for authorizing fb user info
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

module.exports = router