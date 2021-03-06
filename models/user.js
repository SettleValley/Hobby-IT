'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt-nodejs')

const UserSchema = Schema({
  name: {type: String, required: true, default: 'User'},
  email: {type: String, required: true},
  password: {type: String, required: true},
  priority: {type: String, enum:['Regular', 'Admin', 'ShopOwner', 'Organizer' ], default: 'Regular'},
  spots: [{type: Schema.Types.ObjectId, ref: 'Spot'}],
  preference: [{
    type: Schema.Types.ObjectId,
    ref: 'CategorySchema'
  }],
  created_Date: {type:Date, default: Date.now}
})


UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword  = function(password){
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema)
