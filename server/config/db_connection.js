const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost/fancyTodo', {useNewUrlParser: true, useUnifiedTopology: true});
  
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('mongoose connected');
  });
}