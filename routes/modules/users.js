const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bodyParser = require('body-parser')
//引入passport套件
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

//直接將passport 內建函示當中間函數
router.post('/login', passport.authenticate('local', {
  //成功登入 導去首頁
  successRedirect: '/',
  //失敗登入 回去longin頁
  failureRedirect: '/users/login'
}))

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
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } 
      return bcrypt
        .genSalt(10) //產生10顆鹽
        .then(salt => bcrypt.hash(password, salt))// 產生雜湊值
        .then(hash => User.create({
        name,
        email,
        password: hash //用雜湊值取代密碼
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
      
    })
})

// 登出router & add logout button
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})
module.exports = router