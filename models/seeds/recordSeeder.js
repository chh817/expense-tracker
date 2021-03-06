// Assign variables
const bcrypt = require('bcryptjs')

if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
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
        'name': '午餐',
        'date': '2019-04-23',
        'category': '餐飲食品',
        'amount': 60
      },
      {
        'name': '晚餐',
        'date': '2019-04-23',
        'category': '餐飲食品',
        'amount': 60
      },
      {
        'name': '捷運',
        'date': '2019-04-23',
        'category': '交通出行',
        'amount': 120
      },
      {
        'name': '租金',
        'date': '2019-04-01',
        'category': '家居物業',
        'amount': 25000
      }
    ]
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '123',
    ownedRecords: [
      {
        'name': '電影: 驚奇隊長',
        'date': '2019-04-23',
        'category': '休閒娛樂',
        'amount': 220
      }
    ]
  }
]

// Successful connection to MongoDB Atlas
db.once('open', () => {
  return Promise.all(Array.from(seedUsers, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const ownedRecords = seedUser.ownedRecords
        return Promise.all(Array.from(ownedRecords, ownedRecord => {
          const category = ownedRecord.category
          return Category.findOne({ name: category })
            .lean()
            .then(categoryFind => {
              const categoryName = categoryFind.name
              const categoryId = categoryFind._id
              const categoryIcon = categoryFind.icon
              return Record.create({
                name: ownedRecord.name,
                date: ownedRecord.date,
                category: categoryName,
                amount: ownedRecord.amount,
                userId: userId,
                categoryId: categoryId,
                icon: categoryIcon
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
