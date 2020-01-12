require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routes')

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors())
    .use('/', router)
    .listen(port, () => {
        console.log(`app running on port ${port}`)
    })