const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			match: [emailRegex, 'Please enter Valid Email Address']
		},
		password: String,
		fullname: String,
		todoID: {
			type: Schema.Types.ObjectId,
			ref: 'Todo'
		}
	}
)

userSchema.pre('save', function(next){
	console.log('checking existing user');
	mongoose.models['User']
		.findOne({email: this.email})
		.then(user => {
			if (user) {
				next({
					message: 'Email already exist'
				})
			} else {
				console.log('hashing password');
				this.password = bcrypt.hashSync(this.password, 5)
				next()
			}
		})
		.catch(err => {
			console.log(err);
			next(err)
		})
})

const User = mongoose.model('User', userSchema)
module.exports = User