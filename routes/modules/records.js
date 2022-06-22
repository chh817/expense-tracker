// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Route for creating a new transaction record
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  return Category.findOne({ category })
    .lean()
    .then(category => {
      const categoryId = category._id
      return Record.create({ name, date, amount, userId, categoryId })
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
    .then(record => {
      const categoryId = record.categoryId
      Category.findOne({ categoryId })
        .lean()
        .then(category => res.render('edit', { record, category }))
    })
    .catch(err => console.log(err))
})

// Route for editing the record info 
router.put("/:id", (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  const _id = req.params.id
  Record.findOneAndUpdate({ _id, userId }, { name, date, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// Route for deleting the record
router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOneAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

module.exports = router