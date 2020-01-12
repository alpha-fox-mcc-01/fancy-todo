require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes/index')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fancytodo', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
});
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', routes)


app.use('/', (err, req, res, next) => {
    if (err){	
		console.log(err)	
		if (err === 400) {
			res.status(err).json({msg: 'Bad Request'})
		} else if(err === 401) {
			res.status(err).json({msg: 'Username/password is wrong'})
		} else if(err === 403) {
			res.status(err).json({msg: 'Login required'})
		} else if(err === 409) {
			res.status(err).json({msg: 'Already exist'})
		} else if (err === 500) {
			res.status(500).json({msg: 'Internal Server Error'})
		} else {
            res.status(500).json({message: err})
        }
	}
})

app.listen(process.env.PORT, () => {
    console.log('app running on port', process.env.PORT)
})