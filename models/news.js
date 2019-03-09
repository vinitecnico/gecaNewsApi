const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  status: {
    type: Boolean
  },
  showTimeMilliseconds: {
    type: Number
  },
  createDate: {
    type: String
  },
  lastUpdateDate: {
    type: String
  }
});
const Model = mongoose.model('news', newsSchema);
module.exports = Model;