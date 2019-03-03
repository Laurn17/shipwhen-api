 const express = require('express');
 const app = express();
 const morgan = require('morgan');
 const mongoose = require('mongoose');
 var cors = require('cors');

mongoose.Promise = global.Promise;

 const {PORT, DATABASE_URL, CLIENT_ORIGIN} = require('./config');

app.use(morgan('common'));
app.use(express.json());
app.use(express.static("public"));

// CORS FUNCTION
app.use(cors());

 app.get('/api/*', (req, res) => {
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