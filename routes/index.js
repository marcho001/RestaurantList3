const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const restaurantList = require('./modules/restaurantList')
//加入驗證程序 帶入middleware
const { authenticator } = require('../middleware/auth')

//加入後如果未登入會強制導去登入頁面
router.use('/restaurant',authenticator, restaurantList)
router.use('/users', users)
//首頁router '/'要放在最後面 否則每個router都會被用到
router.use('/',authenticator, home)

module.exports = router