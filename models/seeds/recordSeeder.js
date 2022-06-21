// Assign variables
const bcrypt = require('bcryptjs')

if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const recordList = require('../../record.json').results
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose')
const seedUsers = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '123',
    ownedRecords: [
      {
        "name": "午餐",
        "category": "餐飲食品",
        "date": "2019-04-23",
        "amount": 60
      },
      {
        "name": "晚餐",
        "category": "餐飲食品",
        "date": "2019-04-23",
        "amount": 60
      },
      {
        "name": "捷運",
        "category": "交通出行",
        "date": "2019-04-23",
        "amount": 120
      },
      {
        "name": "租金",
        "category": "家居物業",
        "date": "2015-04-01",
        "amount": 25000
      }
    ]
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '123',
    ownedRecords: [
      {
        "name": "電影：驚奇隊長",
        "category": "休閒娛樂",
        "date": "2019-04-23",
        "amount": 220
      }
    ]
  }
]

// Successful connection to MongoDB Atlas
db.once('open', () => {
  return Promise.all(Array.from(userList, user => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const ownedRecords = seedUser.ownedRecords
        return Promise.all(Array.from(ownedRecords, ownedRecord => {
          return Category
            .findOne({ category: ownedRecord.category })
            .lean()
            .then(category => {
              const categoryId = category._id
              return Record.create({
                name: category.name,
                date: category.date,
                amount: category.amount,
                userId: userId,
                categoryId: categoryId
              })
            })
        }))
      })
  }))
    .then(() => {
      console.log('Record seeds done!')
      process.exit()
    })
})
