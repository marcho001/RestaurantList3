const mongoose = require('mongoose')
const Schema = mongoose.Schema
const addRestaurantSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  rating: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  google_map: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }

})

module.exports = mongoose.model('AddRestaurant', addRestaurantSchema)
