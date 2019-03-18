var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cors = require('cors');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
// var bodyParser   = require('body-parser');
var session      = require('express-session');

var {DATABASE_URL} = require('./config/database.js');
var {CLIENT_ORIGIN} = require('./config/server.js');

app.locals.db = mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true
}, function(error){
    if(error){
        console.log(error);
    } else {
        console.log('connected to db');
    }
}); 

mongoose.Promise = global.Promise;
require('./config/passport')(app, passport);

if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === 'test' ? 'http://localhost' : CLIENT_ORIGIN,
    credentials: true
}));
// changed bodyParser.json to express.json
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
// app.use(function(req, res, next){
//     console.log(req.session);
//     console.log(req.session.id);
//     console.log(req.user);
//     next();
// })
// routes ======================================================================
require('./app/routes.js')(app, passport); 

if (require.main === module){
    app.listen(port);
    console.log('The magic happens on port ' + port);
}

module.exports = { app, DATABASE_URL };

let server;


function runServer(DATABASE_URL, port=port) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// `closeServer` function is here in original code

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};
