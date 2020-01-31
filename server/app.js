require('dotenv').config();
require('./models/user');
require('./models/todo');

const db = require('./config/db_connection');
db();

const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use('/', router);
app.get('*', (req, res) => {
  res.status(404).json({
    msg: "not found"
  })
})
app.use('/', errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})