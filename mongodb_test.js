import config from './config' // keys for twitter API
import { sample } from './mongodb'

const assert = require('assert')
const mongodb = require('mongodb')

mongodb.MongoClient.connect(config.mongodb.url, (err, db) => {
  assert.equal(null, err)
  sample(db, () => {
    db.close()
  })
})
