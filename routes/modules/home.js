// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Route for index page
router.get('/', (req, res) => {
  const userId = req.user._id
  const select = req.query.select
  let totalAmount = 0
  if (!select) {
    Record.find({ userId })
      .sort('amount')
      .lean()
      .then(records => {
        Promise.all(Array.from(records, record => {
          totalAmount += record.amount
          record.date = record.date.toJSON().slice(0, 10)
        }))
        return res.render('index', { totalAmount, records })
      })
      .catch(err => console.log(err))
  } else {
    Category.find({ name: select })
      .lean()
      .then(categoryFind => {
        const categoryId = categoryFind[0]._id
        Record.find({ userId, categoryId })
          .sort('amount')
          .lean()
          .then(records => {
            Promise.all(Array.from(records, record => {
              totalAmount += record.amount
              record.date = record.date.toJSON().slice(0, 10)
            }))
            return res.render('index', { select, totalAmount, records })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
})



module.exports = router