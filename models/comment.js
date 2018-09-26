'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = Schema({
  status: {type: Boolean, default: false},
  userBy: {type: Schema.Types.ObjectId, ref: 'User'},
  spotBy: {type: Schema.Types.ObjectId, ref: 'Spot'},
  feed: {type: String, required: true},
  created_Date: {type:Date, default: Date.now}
})

module.exports = mongoose.model('Comment', CommentSchema)
