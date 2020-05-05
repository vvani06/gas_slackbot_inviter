const path = require('path');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
  mode: 'development', // disable minify for bundled file
  devtool: 'inline-source-map',
  context: __dirname,
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Code.js',
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js'
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        include: /\/node_modules\//,
        loader: 'babel-loader'
      }
    ],
  },
  plugins: [
    new GasPlugin(),
  ],
};
