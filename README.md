ICEBREAKER BACK-END LEARNING SANDBOX

INSTALL DEPENDENCIES
$npm install or $yarn install

- Get your Twitter API keys: https://apps.twitter.com/
- You need a consumer key, consumer secret key, an access token key, and an
access token secret key.
- Inside "config.js" replace '...' inside quotes with your Twitter API keys.
- The mongodb field stores our MongoDB database information used for connecting
to the MongoDB database from our code. To use it you must import it (see the
sample codes in the folder).

- In your config.js folder, you should see:
module.exports = {
twitter: {
consumer_key: '...',
consumer_secret: '...',
access_token: '...',
access_token_secret: '...',
timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
},
mongodb: {
url: 'mongodb://localhost:27017/icebreaker',
},
}

config.js:
- Twitter API developer key
- database information

mongodb.js:
- Functions for mongodb_test.js

twitter.js:
- Functions for twitter_test.js

mongodb_test.js:
- Randomly samples one document from 'wildcard' database and console logs it.

twitter_test.js:
- Gets and stores an 'amount' of tweets with 'text' and 'author' field.

TO RUN:
- Make sure the dependencies are installed and you input your API credentials into 'config.js'
- Turn on MongoDB server and shell
- To get tweets and insert into database, run 'babel-node twitter_test.js'
- To get a random tweet from the database, run 'babel-node mongodb_test.js'
