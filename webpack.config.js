var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), // removed this so we can see eslint errors
    new webpack.ProgressPlugin(function handler(percentage, msg) {
      if ((percentage * 100) % 20 === 0) {
        console.log(percentage * 100 + '%')
      }
    })
  ],
  module: {
    preLoaders: [
      { test: /\.js$/, loaders: ['eslint-loader'], exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loaders: [ 'babel'], exclude: /node_modules/ }
    ]
  },
  eslint: {
    configFile: './.eslintrc',
    failOnWarning: true,
    failOnError: true
  }
}
