// Assign variables
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const port = 3000 || process.env.PORT
if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}
const { engine } = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')

// Requiring mongoose
require('./config/mongoose')

// Set up Handlebars
app.set('view engine', 'hbs')
app.engine('hbs', engine({
  defaultLayout: "main", extname: '.hbs'
}))

// Use express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Use passport
usePassport(app)

// Transfer req date to res
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// Guiding request into route
app.use(routes)

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})