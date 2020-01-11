require('dotenv').config()
const express = require('express')
const cors = require('cors')

const mongodbConnection = require('./configs/mongodbConnection')
const routerIndex = require('./routes/index')
const errorHandler = require('./middlewares/errorHandlers')

const app = express()
mongodbConnection()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routerIndex)

app.use('/', errorHandler)

app.listen(process.env.PORT, _ => console.log('Server Started\t Listening on PORT', process.env.PORT))