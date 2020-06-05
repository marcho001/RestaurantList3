const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/addRestaurant')
const User = require('../../models/User')
const bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({ extended: true }))

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword} = req.body
  const errors = []
  if (!email || !password || !confirmPassword){
    errors.push({ message: '請輸入信箱及密碼！' })
  }
  if (password !== confirmPassword ){
    errors.push({ message: '密碼與確認密碼不相符！'})
  }
  if (errors.length){
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
    //檢查有沒註冊 有救回原畫面

  }
})

// 登出router & add logout button
module.exports = router