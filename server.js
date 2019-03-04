'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
const passport = require('passport');

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');

//Logging
app.use(morgan('common'));

// CORS FUNCTION
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.use(express.json());
app.use(express.static("public"));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);


const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});


 app.get('/*', (req, res) => {
   res.json({ok: true});
 });

 
let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
      	.listen(port, function() {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', function(err) {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };