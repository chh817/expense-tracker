// Assign variables
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT || 3000
if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}
const { engine } = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const helpers = require('handlebars-helpers')
const comparison = helpers.comparison()

// Requiring mongoose
require('./config/mongoose')

// Set up Handlebars
app.set('view engine', 'hbs')
app.engine('hbs', engine({
  defaultLayout: "main", extname: '.hbs'
}))

// Use static files
app.use(express.static("public"))

// Use express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Use method-override
app.use(methodOverride('_method'))

// Use passport
usePassport(app)

// Use connect-flash
app.use(flash())

// Transfer req date to res
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.successMsg = req.flash('successMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  res.locals.error = req.flash('error')
  next()
})

// Guiding request into route
app.use(routes)

// Start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})