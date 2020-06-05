const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const restaurantList = require('./modules/restaurantList')

router.use('/', home)
router.use('/restaurant', restaurantList)
router.use('/users', users)

module.exports = router