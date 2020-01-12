require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const todoRouter = require('./Routes/todoRouter')
const userRouter = require('./Routes/userRouter')

//connecting mongoose 
mongoose.connect('mongodb://localhost/FancyTodo', {
  useNewUrlParser : true, useUnifiedTopology : true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Mongoose mongodb connected');
});

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())
app.use('/todos', todoRouter)
app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`This app run on port ${PORT}`);
})