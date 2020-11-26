const webpack = require("webpack");
const path = require("path");
const nodeExternals = require('webpack-node-externals')

let config = {
    context: __dirname + "/src",
    entry: {
      login : "/js/login.js",
      index : "/js/index.js"
    },
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "[name].js"
    },
    target: 'node',
    node: {
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
          
        }]
      }
  }
  
  module.exports = config;