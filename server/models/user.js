const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name:  String,
    googleSign: Boolean,
    password: String,
    email: String,
    todo: [{
        name:  String,
        description: String,
        status:   String,
        duedate: { type: Date},
        }],
    
  });

  const User = mongoose.model('User', userSchema)

  
  module.exports = User