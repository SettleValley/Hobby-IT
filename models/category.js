'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = Schema({
  status: {type: Boolean, default: false},
  userBy: {type: Schema.Types.ObjectId, ref: 'User'},
  spotBy: {type: Schema.Types.ObjectId, ref: 'Spot'},
  title: {type: String, required: true},
  created_Date: {type:Date, default: Date.now}
})

module.exports = mongoose.model('Category', CategorySchema)
