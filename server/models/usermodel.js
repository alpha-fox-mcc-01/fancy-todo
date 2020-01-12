var mongoose = require('mongoose')
var Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

var userSchema = new Schema ({
    username: String,
    email : { 
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String
})


userSchema.pre('save', function(next) {
    var salt = bcrypt.genSaltSync(10);
    console.log(this.password, 'ini password')
    var hash = bcrypt.hashSync(`${this.password}`, salt);
    this.password = hash
    next()
})

var User = mongoose.model('User', userSchema)


module.exports = User