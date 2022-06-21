// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require("../../models/record")

// Route for creating a new transaction record
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  return Category.findOne({ category })
    .lean()
    .then(category => {
      const categoryId = category._id
      return Record.create({ name, date, category, amount, userId, categoryId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

// Route for edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})

// Route for editing the record info 
router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// Route for deleting the record
router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

module.exports = router