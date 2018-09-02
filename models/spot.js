'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SpotSchema = Schema({
  title: String,
  picture: String,
  description: String,
  ranking: {type: Number, default: 0},
  category: {type: String, enum: ['photography', 'skateboard', 'training']},
})

module.exports = mongoose.model('Spot', SpotSchema)
