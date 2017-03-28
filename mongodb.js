const assert = require('assert')

module.exports = {
  /**
   * Randomly samples a document from 'wildcard' database.
   * @param {db} content Database from MongoDB connection
   * @param {requestCallback} callback Function used to process each document retrieved
   */
  sample(db, callback) {
    const cursor = db.collection('wildcard')
    .aggregate([{ $sample: { size: 1 } }])
    cursor.each((err, doc) => {
      assert.equal(err, null)
      if (doc != null) {
        console.log(doc)
      } else {
        callback()
      }
    })
  },
}
