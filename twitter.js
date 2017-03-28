import config from './config' // keys for twitter API
const twit = require('twit') // module for interacting with Twitter API
const mongodb = require('mongodb')

const T = twit(config.twitter)

module.exports = {
  /**
   * Primary function for populating wildcard database.
   * @param {string} content A string such as 'pickupline(s)' or 'icebreaker(s)'
   * @param {number} amount How many tweets you want back.
   * @param {requestCallback} callback Runs after successful Twitter API call.
   */
  getTweets(content, amount, callback) {
    const params = {
      q: `#${content}`,
      lang: 'en',
      result_type: 'recent',
      count: amount,
    }
    T.get('search/tweets', params, callback)
  },

  /**
   * Returns a promise that returns array of key,value pairs
   * @param {Object[]} tweets Array of tweets in JSON
   */
  parseTweet(tweets) {
    return new Promise((resolve, reject) => {
      if (tweets.isArray && tweets.length === 0) {
        reject('No tweets to parse!')
      } else {
        const storetweet = []
        tweets.forEach((t) => {
          console.log('\n')
          console.log(`TWEET: ${t.text}`)
          console.log(`USER: ${t.user.screen_name}`)
          storetweet.push({
            text: t.text,
            author: t.user.screen_name,
            likes: 0,
            dislikes: 0,
          })
          resolve(storetweet)
        })
      }
    })
  },
  /**
   * Stores tweets into MongoDB database 'wildcard'
   * @param {Object[]} tweets Array of tweets
   * @param {string} collectionToInsert MongoDB collection to store in.
   */
  store(tweets, collectionToInsert = 'wildcard') {
    const mongodbURL = config.mongodb.url
    const MongoClient = mongodb.MongoClient
    if (tweets.length > 0) {
      MongoClient.connect(mongodbURL, (mongodbError, db) => {
        if (mongodbError) {
          console.log('Unable to connect, error: ', mongodbError)
          // res.send(err); // from express
        } else {
          const collection = db.collection(collectionToInsert)
          console.log('DB connected successfully')
          collection.insert(tweets, (insertError) => {
            // console.log(`DB insert result: ${records.ops[0]._id}`)
            if (insertError) {
              console.log(`insert error: ${insertError}`)
            } else {
              console.log('successful insertion')
            }
            db.close()
          })
        }
      })
    }
  },
}
