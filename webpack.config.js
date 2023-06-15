const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    modules: [
      path.resolve(__dirname, './public/js/dev/server.js'),
      'firebase/app',
    ],
  },
  output: {
    path: path.resolve(__dirname, './public/js/dist'),
    filename: 'common.js',
    clean: false,
    library: 'storage',
    libraryTarget: 'umd',
    libraryExport: 'storage',
  },
  externals: {
    'firebase/app': 'firebase/app',
    'firebase/storage': 'firebase/storage',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
}
