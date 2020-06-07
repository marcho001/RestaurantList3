const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const routes = require('./routes/index')
//引入session
const session = require('express-session')
//引入passport
const UsePassport = require('./config/passport')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb connect!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定session secret resave saveunintialized
app.use(session({
  secret: 'getOffMySecret',
  resave: false,
  saveUninitialized: true
}))
//使用引入的passport
UsePassport(app)
app.use((req, res, next) => {
  
  //將passport 的登入資訊存到locals 裡面 之後在其他地方都可以使用此狀態
  //存isAuthenticated 是否登入的不林值
  res.locals.isAuthenticated = req.isAuthenticated()
  //存登入者資訊
  res.locals.user = req.user
  next()
  //之後可以在handlebars使用這兩個變數
})

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log('yoyo now is working')
})
