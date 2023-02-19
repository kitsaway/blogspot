const uuid = require("uuid");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostModel = new Schema({
  id: {
    type: String,
    default: uuid.v4
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated_at: {
    type: Date,
    required:false,
    default:null
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deleted_at: {
    type: Date,
    required:false,
    default: null
  }
});

module.exports = mongoose.model('post', PostModel);
