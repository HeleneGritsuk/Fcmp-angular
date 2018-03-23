const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./base.config.js');


module.exports = merge(baseConfig, {
  output: {
    filename: '[name].js',
    // chunkFilename: './dist/[name].app.js',
    publicPath: './',
    path: `${__dirname}./../dist`,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: '[path][name].[ext]',
            outputPath: './',
          },
        }],
      },
      // { test: /\.(png|jpg|jpeg)$/,
      //   exclude: /(node_modules)/,
      //   loaders: [
      //       // 'preload-image',
      //       'file-loader?[path][name].[ext]',
      //
      //   ]
      //
      // },

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?url=false', 'less-loader'],
        }),
      },
    ],
  },

  plugins: [
    // Extract imported CSS into own file
    new ExtractTextPlugin('./css/style.css'),
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false,
      compress: true,
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});
