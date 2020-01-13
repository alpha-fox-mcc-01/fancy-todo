require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes/index.js')
require('./models/user')
require('./models/todo')

mongoose.connect('mongodb://localhost/fancyTodoApp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connection successful')
});
app.use(cors())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use('/', routes)
app.listen(process.env.PORT, function() {
    console.log(`Server is running on port ${process.env.PORT}`)
})