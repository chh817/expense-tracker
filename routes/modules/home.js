// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// Route for index page
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .sort('date')
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.error(err))
})


module.exports = router