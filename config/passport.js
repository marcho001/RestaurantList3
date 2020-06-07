//passport設定在這邊 設定好後去app 引入 然後去router使用功能驗證
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = app => {
  //初始化
  app.use(passport.initialize())
  app.use(passport.session())
  //設定登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '此帳號未註冊'})
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch =>{
            if (!isMatch) {
              return done(null, false, {
            message: '密碼輸入錯誤'
            })
          }
          return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))
  // 引用 Facebook 登入策略
    // ...
    passport.use(new FacebookStrategy({
      clientID: '2045619235582377',
      clientSecret: '6f0a92091e545b53d3fde8d448df2287',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }))
  
 
  //設定序列化反序列話
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}