// Assign variables
const express = require('express')
const router = express.Router()
const users = require('./modules/users')

// Guiding request into route
router.use('/users', users)

module.exports = router