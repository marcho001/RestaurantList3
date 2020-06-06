const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb connect!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log('yoyo now is working')
})
