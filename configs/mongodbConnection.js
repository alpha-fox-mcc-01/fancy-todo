const mongoose = require('mongoose')
module.exports = function () {
	mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })

	db = mongoose.connection
	db.on('error', console.error.bind(console, 'MONGODB Connection Err'))
	db.once('open', function () {
		console.log('MongoDB Started\t', process.env.MONGODB_URI)
	})
}