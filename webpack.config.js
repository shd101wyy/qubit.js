const path = require('path'),
      webpack = require('webpack')
module.exports = {
  entry: path.resolve(__dirname, './lib/qubit.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'qubit.min.js',
    // library: 'QuantumComputing',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
       {
         test: /\.js$/,
         include: [path.resolve(__dirname, './lib')],
         exclude: [/node_modules/],
         loader: 'babel-loader',
         query: {
           presets: ['es2015']
         }
       },
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourcemap: false
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
}