const path = require('path');

module.exports = {
  entry: './app.js', // Adjust the path to your main entry file if needed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Adjust output directory as needed
  },
  mode: 'production', // or 'development' as required
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false,       // For modules not needed in the browser
      "stream": require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Required if you're using Babel
        },
      },
    ],
  },
};
