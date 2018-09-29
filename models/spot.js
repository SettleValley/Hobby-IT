'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SpotSchema = Schema({
  status: {type: Boolean, default: false},
  name: {type: String, required: true},
  gallery:[{}],
  description: {type: String, required: true},
  comments: {type: Schema.Types.ObjectId, ref: 'Comment'},
  addedBy:{type: Schema.Types.ObjectId, ref: 'User'},
  address:{
    lat: String,
    lng: String
  }
  // ,
  // categories: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'CategorySchema'
  // }],
  // facilities: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'FacilitySchema'
  // }]
})

module.exports = mongoose.model('Spot', SpotSchema)
