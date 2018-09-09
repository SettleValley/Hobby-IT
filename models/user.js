'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  priority: {type: String, enum:['Regular', 'Admin', 'ShopOwner', 'Organizer' ], default: 'Regular'},
  preference: [{
    type: Schema.Types.ObjectId,
    ref: 'CategorySchema'
  }],
  created_Date: {type:Date, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema)
