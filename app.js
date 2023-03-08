var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
var { getFloorPriceAndEthPrice } = require('./floorPricesAndEthPrice')
var transactionSeed = require('./addTransAll')

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

app.use(
  cors({
    origin: ['http://localhost:3000']  // <== URL of our future React app
  })
);

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


getFloorPriceAndEthPrice();
let floorPriceAndEthPriceInterval;
floorPriceAndEthPriceInterval = setInterval(() => {
  getFloorPriceAndEthPrice();
}, 60 * 60 * 1000)

// function startInterval() {
//   // Get the current time and calculate the milliseconds until the next :30 minute
//   const now = new Date();
//   const msUntil30 = (30 - now.getMinutes() % 30) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
//   // Wait until the next :30 minute and then start the interval
//   setTimeout(() => {
//     transactionSeed(); // Run the code immediately
//     setInterval(transactionSeed(), 30 * 60 * 1000); // Run the code every 30 minutes
//   }, msUntil30);
// }

// startInterval();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
