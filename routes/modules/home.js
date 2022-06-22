// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Route for index page
router.get('/', (req, res) => {
  const userId = req.user._id
  const select = req.query.select || _id
  let totalAmount = 0
  const categoryList = []
  Category.find({ select })
    .lean()
    .then(categorySelected => Promise.all(Array.from(categorySelected, category => {
      categoryList.push[{ category }]
      const categoryId = category._id
      return Record.find({ userId, categoryId })
        .sort(categoryId)
        .lean()
        .then(records => {
          Promise.all(Array.from(records, record => totalAmount += record.amount))
          return res.render('index', { select, totalAmount, records, categoryList })
        })
    })))
    .catch(err => console.error(err))
})

module.exports = router