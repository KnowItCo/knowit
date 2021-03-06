var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
      { test: /\.js$/, loaders: [ 'babel'], exclude: /node_modules/ },
      { test: /\.jsx$/, loaders: [ 'babel'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.styl/, loader : 'style-loader!css-loader!stylus-loader' }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "/node_modules")]
  },
  resolve: {
    root: [
    path.resolve('/'),
    ]
  },
  eslint: {
    formatter: require("eslint-friendly-formatter"),
    configFile: './.eslintrc',
    failOnError: true
  }
}
