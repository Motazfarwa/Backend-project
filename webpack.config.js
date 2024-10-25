const path = require('path');

module.exports = {
  entry: './app.js', // Adjust this path if your entry file is elsewhere
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'production', // You can change this to 'development' if needed
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Install if using ES6/React
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "fs": false, // Use empty module for 'fs' since it's not needed in browser
      "net": false, // Use empty module for 'net'
    },
  },
};
