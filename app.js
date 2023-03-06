var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collectionDetailsRouter = require('./routes/collectionDetails');
var nftDetailsRouter = require('./routes/nftDetails');
var salesAllRouter = require('./routes/salesAll');
var salesOneRouter = require('./routes/salesOne');
var allTokensRouter = require('./routes/allTokens');
var collectionAnalyticsAll = require('./routes/collectionAnalyticsAll');
var collectionAnalyticsOne = require('./routes/collectionAnalyticsOne');

var app = express();

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/collection-details', collectionDetailsRouter);
app.use('/nft-details', nftDetailsRouter);
app.use('/sales-all-collections', salesAllRouter);
app.use('/sales-one-collection', salesOneRouter);
app.use('/all-tokens', allTokensRouter);
app.use('/all-collection-analytics', collectionAnalyticsAll);
app.use('/one-collection-analytics', collectionAnalyticsOne);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
