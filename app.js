// Assign variables
const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}
const { engine } = require('express-handlebars')

// Requiring mongoose
require('./config/mongoose')

// Set up Handlebars
app.set('view engine', 'hbs')
app.engine('hbs', engine({
  defaultLayout: "main", extname: '.hbs'
}))











// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})