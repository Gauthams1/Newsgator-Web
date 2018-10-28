var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var HandlebarsIntl = require('handlebars-intl');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
const busboy = require('connect-busboy');
const busboybodyparser = require('busboy-body-parser');
var Media = require('./models/media');
var Payment = require('./models/transaction');
var big = require('./models/ids');
var  ObjectID = require('mongodb').ObjectID;


mongoose.connect('mongodb://gauth:1234@ds119018.mlab.com:19018/testing-gautham-project');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var media = require('./routes/media');
var admin = require('./routes/admin');
var cart = require('./routes/cart');
var dashboard = require('./routes/dashboard');
var json = require('./routes/json');

// Init App
var app = express();

// View Engine
var hbs = exphbs.create({extname: '.handlebars'});
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
HandlebarsIntl.registerWith(hbs.handlebars);

// BodyParser Middleware
app.use(busboy());
app.use(busboybodyparser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.mediatype=big.mediatype
  if(!req.isAuthenticated())
  return next();

  var items = req.user.items;
  var search_item = [];
  var price = 0;
  var today= new Date();
  var weekago= new Date();weekago.setDate(weekago.getDate()-7);
  var monthago= new Date();monthago.setMonth(weekago.getMonth()-1);
  var yearago= new Date();yearago.setYear(weekago.getYear()-1);
      for (var i = 0; i < items.length; i++) {
      search_item.push({ _id: items[i].fileid })
  }
  Media.find({ $or: search_item }, function(err, media) {
    Payment.aggregate([{ $match : {sellerid:ObjectID(req.user._id).toString()} },{ $group: { "_id": {_id:"$fileid", user_id: "$sellerid",file:"$filename"}, amount: {$sum:{$multiply:[{$sum:["$amount","$licencefee"]},"$percentage",0.01]}},number:{$sum:1},
    weeklyamount:{$sum:{$cond:{ if: { $gte: [ "$date", weekago ] }, then: {$sum:{$multiply:[{$sum:["$amount","$licencefee"]},"$percentage",0.01]}}, else: 0 }}},  weeklyorder:{$sum:{$cond:{ if: { $gte: [ "$date", weekago ] }, then: 1, else: 0 }}},
    monthlyamount:{$sum:{$cond:{ if: { $gte: [ "$date", monthago ] }, then: {$sum:{$multiply:[{$sum:["$amount","$licencefee"]},"$percentage",0.01]}}, else: 0 }}},  monthlyorder:{$sum:{$cond:{ if: { $gte: [ "$date", monthago ] }, then: 1, else: 0 }}},
    yearlyamount:{$sum:{$cond:{ if: { $gte: [ "$date", yearago ] }, then: {$sum:{$multiply:[{$sum:["$amount","$licencefee"]},"$percentage",0.01]}}, else: 0 }}},  yearlyorder:{$sum:{$cond:{ if: { $gte: [ "$date", yearago ] }, then: 1, else: 0 }}},
    }}], function (err, usr) {
      var money=0,moneyweekly=0,moneymonthly=0,moneyyearly=0,order=0,orderweekly=0,ordermonthly=0,orderyearly=0;
      for (var i = 0; i < usr.length; i++) {
        money += usr[i].amount;
        order+=usr[i].number
        moneyweekly += usr[i].weeklyamount;
        orderweekly+=usr[i].weeklyorder
        moneymonthly += usr[i].monthlyamount;
        ordermonthly+=usr[i].monthlyorder
        moneyyearly += usr[i].yearlyamount;
        orderyearly+=usr[i].yearlyorder

        usr[i].amount = usr[i].amount;
        usr[i].weeklyamount = usr[i].weeklyamount;
        usr[i].monthlyamount= usr[i].monthlyamount;
        usr[i].yearlyamount  = usr[i].yearlyamount;
      }
      if(!media) {
        media=[];
      }
      else {
        for(var i = 0; i < media.length; i++) {
          price += media[i].price;
        }}
        res.locals.media=media;
        res.locals.price=price;
        res.locals.order=order;
        res.locals.earningday=money;
        res.locals.orderweek=orderweekly;
        res.locals.earningweek=moneyweekly;
        res.locals.ordermonthly=ordermonthly;
        res.locals.earningmonth=moneymonthly;
        res.locals.orderyearly=orderyearly;
        res.locals.earningyear=moneyyearly;
        res.locals.dashboardmediasold=usr;
        next();
      })
    });

});



app.use('/', routes);
app.use('/users', users);
app.use('/media', media);
app.use('/admin', admin);
app.use('/cart', cart);
app.use('/dashboard', dashboard);
app.use('/json', json);
// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
function objectIdWithTimestamp(timestamp) {
    if (typeof(timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }
    var hexSeconds = Math.floor(timestamp/1000).toString(16);
    var constructedObjectId = ObjectID(hexSeconds + "0000000000000000");

    return constructedObjectId
}
