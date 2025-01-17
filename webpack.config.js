var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001,
  },
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: 'none',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
