const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
require('dotenv').config()
require('./config/connect')()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes'))

app.listen(port, () => console.log('listening on port', port))