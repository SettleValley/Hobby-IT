'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SpotSchema = Schema({
  status: {type: Boolean, default: false},
  name: {type: String, required: true},
  gallery:[{
    title: String,
    url: String,
    format: String
  }],
  description: {type: String, required: true},
  // Comments: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'CommentsSchema'
  // }],
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
