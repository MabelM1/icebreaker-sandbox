import { getTweets, store, parseTweet } from './twitter'

async function storeTweets() {
  let tweets
  getTweets('pickuplines', 5, async (error, data, res) => {
    tweets = data.statuses
    console.log(`TWITTER RESPONSE ${res.statusCode}`)
    //  create wildcard schema
    try {
      const f = await parseTweet(tweets)
      store(f)
    } catch (e) {
      console.log(e)
    }
  })
}

storeTweets()
