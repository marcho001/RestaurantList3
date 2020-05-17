const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/addRestaurant')


router.get('/:id', (req, res) => {
  return Restaurants.findById(req.params.id)
    .lean()
    .then(list => res.render('show', { list }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  return Restaurants.findById(req.params.id)
    .then(list => list.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  return Restaurants.findById(req.params.id)
    .lean()
    .then(list => res.render('edit', { list }))
    .catch(error => console.log(error))
})



router.put('/:id', (req, res) => {
  const id = req.params.id
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

  return Restaurants.findById(id)
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
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  return Restaurants.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router