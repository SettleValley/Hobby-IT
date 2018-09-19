'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt-nodejs')

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

UserSchema.methods.encyptPassword = (password) =>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};

UserSchema.methods.validPassword = (password)=>{
  return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', UserSchema)
