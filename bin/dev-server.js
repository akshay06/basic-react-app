const path = require('path');
const serve = require('webpack-serve');
const config = require('../webpack.config.js')();
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const appConfig = require('../src/config');
const history = require('connect-history-api-fallback');
const argv = {};


const serveConfig = {
  clipboard: false,
  port: 3100,
  devMiddleware: {
    publicPath: '/dist/',
    index: '/dist/index.html',
    stats: {
      children: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  add: (app, middleware, options) => {
    app.use(convert(proxy('/api', { target: appConfig.apiHost })));

    app.use(convert(history({
      index: '/dist/index.html'
    })));

  },
};

serve(argv, { config, ...serveConfig })
  .then(server => {});
