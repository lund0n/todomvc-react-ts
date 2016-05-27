'use strict';
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');

const webpackProdConfig = Object.assign({}, webpackBaseConfig);

webpackProdConfig.devTool = '#source-map';
webpackProdConfig.tslint = {
  emitErrors: true,
  failOnHint: true,
};
webpackProdConfig.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
];
module.exports = webpackProdConfig;
