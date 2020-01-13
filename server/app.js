require ('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const router = require ('./routers/index')
const errorHandler = require ('./middlewares/errorHandler')


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOOSE, {useNewUrlParser: true, useUnifiedTopology : true, useFindAndModify : false})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`);
});

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// ROUTE <==================================================>
app.use('/', router)
app.use('/', errorHandler)


app.listen(process.env.PORT, () => console.log(`connected to port ${process.env.PORT}`))