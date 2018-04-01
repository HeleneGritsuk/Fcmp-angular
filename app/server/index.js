const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = require('./config').url;
const port = require('./config').port;
const app = express();
const index = require('./routes/index');
// const handlers = require('./handlers/index.js');

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl)
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});
app.use(express.static('public'));

require('./routes/index')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
// catch 404 and forward to error handler
// app.use(handlers.notFoundHandler);
// //error handler
// app.use(handlers.errorHandler);
