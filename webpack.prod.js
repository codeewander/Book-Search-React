const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  // mode: "development"
  output: {
    publicPath: '/Book-Search-React/dist/',
  }
});