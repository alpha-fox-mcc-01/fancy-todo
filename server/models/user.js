const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
})
userSchema.path('email').validate(function(input, done){
   this.model('User').count({email: input}), function (err, done){
     if(err) {
       return done(err.msg)
     }
     if (count > 0 ) {
       this.invalidate('email')
     } else {
       done(!count)
     }
   }
 }, 'email has been registered, use another email')


userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        else {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        }
    })
}) 
const User = mongoose.model('User', userSchema);

module.exports = User