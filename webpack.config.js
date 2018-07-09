const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const PROJECT_ROOT = __dirname;
// const NODE_MODULES = path.join(PROJECT_ROOT, 'node_modules');

module.exports = {
  context: PROJECT_ROOT,
  entry: {
    home: './scripts/index.jsx',
  },

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,

  },

  output: {
    path: path.join(PROJECT_ROOT, '/dist'),
    filename: '[name]-[id]-[hash].js',
    publicPath: '',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
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
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: () => [ // post css plugins, can be exported to postcss.config.js
              precss,
              autoprefixer,
            ],
          },
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },

      {
        test: /\.(woff|woff2|ttf|eot|jpe?g|png|gif|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
