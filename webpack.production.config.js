var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index',
  output: {
    path: path.join(__dirname, 'public', 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
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
    failOnError: false
  }
}
