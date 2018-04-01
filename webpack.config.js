const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/app.module.js',
  output: {
    path: path.resolve('./dist/js/'),
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.js', '.html'],
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          mode: 'development',
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
