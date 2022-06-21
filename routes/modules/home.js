// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Route for index page
router.get('/', (req, res) => {
  const userId = req.user._id
  const select = req.query.select || '全部'
  let totalAmount = 0
  Record.find({ userId, select })
    .sort(select)
    .lean()
    .then(records => {
      Promise.all(Array.from(records, record => {
        totalAmount += record.amount
        Category.findOne({ select })
          .lean()
          .then(category => {
            const categories = []
            categories.push(category)
          })
      }))
      return res.render('index', { totalAmount, records, categories })
    })
    .catch(err => console.error(err))
})

module.exports = router