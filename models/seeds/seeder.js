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
  
  // Promise.all([createUser(users[0], restaurants), createUser(users[1], restaurants)])
  //   .then(() => {
    //     console.log('done!')
    //     process.exit()
    //   })
    

    //註冊兩個使用者n
    users.forEach(user => {
      bcrypt
      .genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => {
      User.create({
        name: user.name,
        email: user.email,
        password: hash
      })
      .then(user => {
        const userId = user._id
        //塞入種子餐廳給使用者
        if (user.name === 'user1') {
          let seeds = restaurants.slice(0, 4)
          return Promise.all(Array.from(seeds, seed => {
            Restaurant.create({
              name: seed.name,
              category: seed.category,
              location: seed.location,
              phone: seed.phone,
              rating: seed.rating,
              description: seed.description,
              image: seed.image,
              google_map: seed.google_map,
              userId
            })
          }))
        }
        if (user.name === 'user2') {
          let seeds = restaurants.slice(4, 8)
          return Promise.all(Array.from(seeds, seed => {
            Restaurant.create({
              name: seed.name,
              category: seed.category,
              location: seed.location,
              phone: seed.phone,
              rating: seed.rating,
              description: seed.description,
              image: seed.image,
              google_map: seed.google_map,
              userId
            })
          }))
        }
      })
    })
  }) 
})



// function createUser(user, lists) {
  //   bcrypt
  //     .genSalt(10)
  //     .then(salt => bcrypt.hash(user.password, salt))
  //     .then(hash => {
    //       User.create({
//         name: user.name,
//         email: user.email,
//         password: hash
//       })
//         .then(newUser => {
//           const userId = newUser._id
//           //塞入種子餐廳給使用者
//           if (newUser.name === 'user1') {
//             let seeds = lists.slice(0, 4)
//             return Promise.all(Array.from(seeds, seed => {
//               Restaurant.create({
//                 name: seed.name,
//                 category: seed.category,
//                 location: seed.location,
//                 phone: seed.phone,
//                 rating: seed.rating,
//                 description: seed.description,
//                 image: seed.image,
//                 google_map: seed.google_map,
//                 userId
//               })
//             }))
//           }
//           if (newUser.name === 'user2') {
//             let seeds = lists.slice(4, 8)
//             return Promise.all(Array.from(seeds, seed => {
//               Restaurant.create({
//                 name: seed.name,
//                 category: seed.category,
//                 location: seed.location,
//                 phone: seed.phone,
//                 rating: seed.rating,
//                 description: seed.description,
//                 image: seed.image,
//                 google_map: seed.google_map,
//                 userId
//               })
//             }))
//           }
//         })
//     })
// }

// function createUser(user, lists) {
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(user.password, salt))
//     .then(hash => {
//       User.create({
//         name: user.name,
//         email: user.email,
//         password: hash
//       })
//         .then(newUser => {
//           const userId = newUser._id
//           //塞入種子餐廳給使用者
//           if (newUser.name === 'user1') {
//             let seeds = lists.slice(0, 4)
//             seeds.forEach(e => {
//               Restaurant.create({
//                 name: e.name,
//                 category: e.category,
//                 location: e.location,
//                 phone: e.phone,
//                 rating: e.rating,
//                 description: e.description,
//                 image: e.image,
//                 google_map: e.google_map,
//                 userId
//               })
              
//             })
//           }
//           if (newUser.name === 'user2') {
//             let seeds = lists.slice(4, 8)
//             seeds.forEach(e => {
//               Restaurant.create({
//                 name: e.name,
//                 category: e.category,
//                 location: e.location,
//                 phone: e.phone,
//                 rating: e.rating,
//                 description: e.description,
//                 image: e.image,
//                 google_map: e.google_map,
//                 userId
//               })

//             })
//           }
//         })
//     })
// }