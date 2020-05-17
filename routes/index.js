const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurantList = require('./modules/restaurantList')

router.use('/', home)
router.use('/restaurant', restaurantList)

module.exports = router