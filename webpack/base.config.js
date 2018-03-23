const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: `${__dirname}/../app`,
  entry: {
    main: ['whatwg-fetch', 'babel-polyfill', './app.js'],
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      }],
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
