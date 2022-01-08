const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config()

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
    compress: true,
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
      },
    },
  },

  entry: {
    src: './src/index.js',
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
      template: './src/index.html',
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_MAPBOX_API: JSON.stringify(process.env.REACT_APP_MAPBOX_API),
      }
    })
  ],
};
