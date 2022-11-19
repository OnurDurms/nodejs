'use strict';

const express = require('express');
var bodyParser = require('body-parser');
require('./database/connection').connect();
const auth = require("./middleware/auth");
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require("./routes/user")(router,auth));
app.use('/api', require("./routes/task")(router,auth));

app.listen(1453, function () {
  console.log('Sunucu çalışıyor...');
});