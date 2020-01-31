const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  due_date: Date,
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});

todoSchema.pre('save', function(next) {
  setTimeout(() => {
    console.log('etetetet')
    next()
  }, 1000)
})  

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;