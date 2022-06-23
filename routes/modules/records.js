// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

// Route for clicking create button
router.get("/", (req, res) => {
  return res.render("new")
})

// Route for creating a new transaction record
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  return Category.findOne({ name: category })
    .lean()
    .then(categoryFind => {
      const categoryId = categoryFind._id
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
      record.date = record.date.toJSON().slice(0, 10)
      console.log(record.date)
      const categoryId = record.categoryId
      Category.findOne({ categoryId })
        .lean()
        .then(categoryFind => {
          console.log(categoryFind)
          res.render('edit', { record, categoryFind })
        })
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
