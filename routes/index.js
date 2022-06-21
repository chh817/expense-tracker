// Assign variables
const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const records = require('./modules/records')
const home = require('./modules/home')
const { authenticator } = require('../middleware/auth')

// Guiding request into route
router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

module.exports = router