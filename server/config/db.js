const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true });
    mongoose.set('useFindAndModify', false)
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
    });
}