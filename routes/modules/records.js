// Assign variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')
const record = require('../../models/record')

// Route for clicking create button
router.get("/", (req, res) => {
  return res.render("new")
})

// Route for creating a new transaction record
router.post('/', (req, res) => {
  const { nameInput, dateInput, categoryInput, amountInput } = req.body
  const userId = req.user._id
  return Category.find({ name: categoryInput })
    .lean()
    .then(categoryFind => {
      const categoryId = categoryFind[0]._id
      const icon = categoryFind[0].icon
      return Record.create({ name: nameInput, date: dateInput, category: categoryInput, amount: amountInput, userId, categoryId, icon })
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
      return res.render('edit', { record })
    })
    .catch(err => console.log(err))
})

// Route for editing the record info 
router.put("/:id", (req, res) => {
  const { inputName, inputDate, inputCategory, inputAmount } = req.body
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => {
      record.name = inputName
      record.date = inputDate
      record.category = inputCategory
      record.amount = inputAmount
      return record.save()
    })
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
