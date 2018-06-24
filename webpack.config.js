const path = require('path');

const PROJECT_ROOT = __dirname;

module.exports = {
  context: PROJECT_ROOT,
  entry: {
    home: './src/index.jsx',
  },

  devtool: 'source-map',

  output: {
    path: path.join(PROJECT_ROOT, '/dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
    ],
  },

  // resolve: {
  //   extensions: ['.js'],
  // },

};
