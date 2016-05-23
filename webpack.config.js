'use strict';
const path = require('path');

module.exports = {
  entry: './js/app.tsx',
  output: {
    path: path.resolve('dist'),
    publicPath: '/dist/',
    filename: 'app.js'
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, excludes: /node_modules/, loader: 'ts-loader'}
    ]
  },
  externals: {

  }
};
