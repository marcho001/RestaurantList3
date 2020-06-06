const express = require('express')
const router = express.Router()
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
  const { name, email, password, confirmPassword } = req.body
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
  }
  //檢查有沒註冊 有救回原畫面
  User.findOne({ email })
    .then(user => {
      if(user){
        errors.push({message: '這個email 已經註冊囉'})
        console.log('User is exists')
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
      }
    })
})

// 登出router & add logout button
module.exports = router