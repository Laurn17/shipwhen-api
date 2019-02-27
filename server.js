 const express = require('express');
 const app = express();
 var cors = require('cors');
 const {CLIENT_ORIGIN} = require('./config');

// My port is now in config.js, can delete this once i re-do line 20
 const PORT = process.env.PORT || 3000;

// CORS FUNCTION
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

 app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app};