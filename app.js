var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');



//var users = require('./routes/users');

var index = require('./routes/index');
var auth = require('./routes/auth');
// var fruits = require('./routes/fruits');
// var veggies = require('./routes/veggies');
var coupon = require('./routes/coupon');
//var usercoupon = require('./routes/usercoupon');
var orders = require('./routes/orders');
var billing = require('./routes/billing');
var deliveryAddress = require('./routes/deliveryAddress');
var Products =  require('./routes/Products');
var cart = require('./routes/cart');
var contactus = require('./routes/contactus');
var aboutus = require('./routes/aboutus');
var banners = require('./routes/banners');
var category = require('./routes/category');

// var introSlides = require('./routes/introSlides');

var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);

app.use('/Products',Products);


app.use('/orders', orders);
app.use('/coupon', coupon);
app.use('/billing', billing);
app.use('/deliveryAddress',deliveryAddress);
app.use('/forgetpassword',auth);
app.use('/search',Products);

app.use('/cart',cart);

app.use('/contactus',contactus);
app.use('/aboutus',aboutus);
app.use('/banners', banners);
app.use('/category', category);

// app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
