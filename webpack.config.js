// webpack.config.js
const path = require('path')

module.exports = {
  entry: {
    main: [path.resolve(__dirname, './public/modules.js'), 'firebase/app'],
  },
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
}
