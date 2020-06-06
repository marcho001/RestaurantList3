//passport設定在這邊 設定好後去app 引入 然後去router使用功能驗證
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

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
        if (password !== user.password) {
          return done(null, false, {
            message: '密碼輸入錯誤'
          })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
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