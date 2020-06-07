const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/addRestaurant')


router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then(list => res.render('show', { list }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurants.findOne({ _id, userId })
    .then(list => list.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then(list => res.render('edit', { list }))
    .catch(error => console.log(error))
})



router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const {
    name,
    category,
    location,
    phone,
    rating,
    description,
    image,
    google_map
  } = req.body

  return Restaurants.findOne({_id, userId})
    .then(list => {
      list.name = name
      list.location = location
      list.category = category
      list.phone = phone
      list.rating = rating
      list.description = description
      list.image = image
      list.google_map = google_map
      return list.save()
    })
    .then(() => res.redirect(`/restaurant/${_id}`))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const {
    name,
    category,
    location,
    phone,
    rating,
    description,
    image,
    google_map
  } = req.body
  return Restaurants.create({
    name,
    category,
    location,
    phone,
    rating,
    description,
    image,
    google_map,
    userId})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router