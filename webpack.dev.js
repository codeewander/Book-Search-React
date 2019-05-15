const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
  // mode: "production",
  mode: "development",
  devServer: {
    // contentBase: path.join(__dirname, "public/"),
    port: 3000,
    host: 'localhost',
    // publicPath: "http://localhost:3000",
    hotOnly: true
  }
});