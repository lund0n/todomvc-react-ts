'use strict';
const path = require('path');
const WebpackLivereloadPlugin = require('webpack-livereload-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: './js/app.tsx',
  output: {
    path: path.resolve('dist'),
    publicPath: '/dist/',
    filename: 'app.js',
    libraryTarget: 'umd'
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    preLoaders: [
      {test: /\.tsx?$/, excludes: /node_modules/, loader: 'tslint'}
    ],
    loaders: [
      {test: /\.css$/, excludes: /node_modules/, loaders: ['style', 'css']},
      {test: /\.tsx?$/, excludes: /node_modules/, loader: 'ts-loader'}
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true,
  },
  externals: [
    'classnames',
    'director',
    'moment',
    'react',
    'react-dom'
  ]
};
