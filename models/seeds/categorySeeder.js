// Assign variables
if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const categoryList = require('../../category.json').results
const db = require('../../config/mongoose')

// Successful connection to MongoDB Atlas
db.once('open', () => {
  return Promise.all(Array.from(categoryList, category => {
    Category.create(category)
  }))
    .then(() => {
      console.log('Category seed done!')
      process.exit()
    })
})
