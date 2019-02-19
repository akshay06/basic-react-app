const express = require('express');
const path = require('path');
const appConfig = require('../src/config');
const proxy = require('http-proxy-middleware');

const port = 3100;
const app = express();
const ROOT_DIR = path.resolve(__dirname, '../');

app.use('/api/', proxy({ target: appConfig.apiHost }));

app.use('/dist/', express.static(path.resolve(ROOT_DIR, 'public/dist')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(ROOT_DIR, 'public/dist/index.html'));
});


app.listen(port, function() {
  console.log('App started at port - ', port);
})
