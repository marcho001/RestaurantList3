if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const list = require('../../restaurant.json')
const restaurants = list.results
const users = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]
const Restaurant = require('../addRestaurant')
const User = require('../User')
const bcrypt = require('bcryptjs')


db.once('open', () => {


  User.findOne({ name: users.name })
    .then(user => {
      if (user) {
        console.log('seeder 已經執行過了')
        return process.exit()
      }

      Promise.all([createUser(users[0], restaurants), createUser(users[1], restaurants)])
        .then((v) => {
          console.log(v)
          process.exit()
        })
        .catch(err => console.log(err.message))

    })

    
    
    
  })
  
  
  function createUser(user, lists) {
    //註冊兩個使用者n
    return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => User.create({
      name: user.name,
        email: user.email,
        password: hash
      }))
    .then(newUser => {
      console.log(newUser)
      const userId = newUser._id
      //塞入種子餐廳給使用者
      if (newUser.name === 'user1') {
        let seeds = lists.slice(0, 4)
        return Promise.all(seeds.map((seeds) => {
          return Restaurant.create({
            name: seeds.name,
            category: seeds.category,
            location: seeds.location,
            phone: seeds.phone,
            rating: seeds.rating,
            description: seeds.description,
            image: seeds.image,
            google_map: seeds.google_map,
            userId
          })
        }))
       
      }
      if (newUser.name === 'user2') {
        let seeds = lists.slice(4, 8)
        console.log(seeds)
        return Promise.all(seeds.map((seeds) => {
          return Restaurant.create({
            name: seeds.name,
            category: seeds.category,
            location: seeds.location,
            phone: seeds.phone,
            rating: seeds.rating,
            description: seeds.description,
            image: seeds.image,
            google_map: seeds.google_map,
            userId
          })
        }))
      }
    })
}

