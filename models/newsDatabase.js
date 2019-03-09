const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsDatabaseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: Boolean
  },
  createDate: {
    type: Date
  },
  lastUpdateDate: {
    type: Date
  }
});
const Model = mongoose.model('newsDatabases', newsDatabaseSchema);
module.exports = Model;