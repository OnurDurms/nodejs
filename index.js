'use strict';

const express = require('express');
var bodyParser = require('body-parser');
require('./database/connection').connect();
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', require("./routes/user")(router));
app.use('/task', require("./routes/task")(router));

app.listen(1453, function () {
  console.log('Sunucu çalışıyor...');
});