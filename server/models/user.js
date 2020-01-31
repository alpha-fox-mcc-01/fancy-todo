const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: String,
  google_sign: Boolean,
  todoIds: [
    {
      type: Schema.Types.ObjectId, ref: 'Todo'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;