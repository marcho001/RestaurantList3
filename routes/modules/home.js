const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/addRestaurant')

router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then((list) => {

      list.forEach((i) => {
        if(Number(i.rating) > 4.5 ){
          i.popular = true
        }
      })

      res.render('index', { list, popular : list.popular })
    })
    .catch(error => console.log(error))
})
router.get('/create', (req, res) => {
  return res.render('create')
})
router.get('/search', (req, res) => {
  const query = req.query.keywords.toLowerCase()
  return Restaurants.find()
    .lean()
    .then((lists) => {
      const list = []
      console.log(lists)
      lists.forEach((item) => {
        if (item.name.toLowerCase().includes(query)) {
          list.push(item)
        } else if (item.category.toLowerCase().includes(query)) {
          list.push(item)
        } else if (item.rating.toLowerCase().includes(query)) {
          list.push(item)
        }
      })
      return list
    })
    .then(list => res.render('index', { list }))
    .catch(error => console.log(error))
})

module.exports = router