//用此檔案做出使用者認證的功能
//如果沒登入無法使用 登入才能去守夜

module.exports = {
  authenticator: (req, res, next) => {
    //passport 內建功能isAuthenticated 依登入狀態回傳布林值
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  }
}