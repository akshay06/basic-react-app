const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = !IS_PROD;

const ROOT_DIR = path.resolve(__dirname, './');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

const commonPlugins = [
  /* Clear dist folder before a new build */
  new CleanPlugin([path.resolve(ROOT_DIR, 'public/dist')], { root: ROOT_DIR }),

  /* For optimizing lodash */
  new LodashModuleReplacementPlugin({
    shorthands: true, // Should be able to use _.map(arr, 'obj')
    collections: true,
    paths: true
  }),

  /* For webpack build progress % */
  new ProgressBarPlugin(),

  /* Remove unnecessary moment files */
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

  /* Define globals */
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': IS_PROD ? '"production"' : '"development"',
    __PRODUCTION__: IS_PROD,
    __DEVELOPMENT__: IS_DEV,
  }),

  new HtmlWebpackPlugin({
    template: path.resolve(ROOT_DIR, 'public/index.html')
  })
];

const devPlugins = [
  ...commonPlugins,
];

const prodPlugins = [
  ...commonPlugins,

  new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),

  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[name].[contenthash].css'
  }),
];

module.exports = function webpackConfig() {
  const config = {
    mode: IS_PROD ? 'production' : 'development',
    devtool: IS_PROD ? 'hidden-source-map' : 'eval',
    context: ROOT_DIR,
    entry: {
      main: [
        'react-hot-loader/patch',
        path.resolve(SRC_DIR, 'index.js')
      ]
    },
    output: {
      publicPath: '/dist/',
      path: path.resolve(ROOT_DIR, 'public/dist'),
      filename: IS_PROD ? '[name].[chunkhash].js' : '[name].js',
    },
    /* Disabling logs from plugins like mini css extract */
    stats: {
      children: false
    },
    performance: {
      hints: false
    },
    optimization: {},
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader?cacheDirectory'
            },
            {
              loader: 'eslint-loader',
              options: {
                // Don't show warnings in webpack output
                quiet: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.scss$/,
          use: [
            IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                localIdentName: IS_PROD ? '[hash:base64:5]' : '[local]___[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceMapContents: true
              }
            },
            // {
            //   loader: 'sass-resources-loader',
            //   options: {
            //     /* Variables file here */
            //     // resources: [path.resolve(SRC_DIR, 'scss/main.scss')]
            //   }
            // }
          ]
        },
        {
          /* Fonts and Images */
          test: /\.(png|jpg|svg|ttf|eot|svg|otf|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader',
        }
      ]
    },
    resolve: {
      modules: [
        SRC_DIR,
        'node_modules'
      ],
      extensions: ['.json', '.js', '.jsx'],
      alias: {
        assets: path.resolve(SRC_DIR, 'assets')
      }
    },
    plugins: IS_PROD ? prodPlugins : devPlugins
  };

  if (IS_PROD) {
    config.optimization.minimizer = [
      /* Ugligy JS */
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),

      /* Minify CSS */
      new OptimizeCSSAssetsPlugin()
    ];
  }

  return config;
};
