// express web server
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
  // basic express session({..}) initialization
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, OPTIONS, PATCH'
  );
  next();
  })
  .use(cors({ methods: ['GET','POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']}))
  .use(cors({ origin: '*'}))
  .use("/", require("./routes/index.js"));

  // routing
app.use('/', require('./routes'));

// error handler for all errors
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, 'Caught exception: ${err}\n' + 'Exception onrigin: ${origin}');
  })

  // is mongodb listening?
mongodb.initDb((err) => {
    if(err) {
      console.log(err);
    }
    else {
      app.listen(port, () => {console.log('DATABASE MONGO is listening and NODE running on PORT ' + port)});
    }
  });