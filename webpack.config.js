const path = require('path');

module.exports = {
  mode: 'development', // Use 'production' for production builds
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
      process: require.resolve('process/browser'),
      vm: require.resolve('vm-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      url: require.resolve('url'), // Polyfill for 'url'
      fs: false, // Set to false if not needed
      net: false, // Not supported in the browser, set to false
      tls: false, // Not supported in the browser, set to false
      http: require.resolve('stream-http'), // For HTTP requests in a browser-like environment
      https: require.resolve('https-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devtool: 'source-map', // Enable source maps for debugging
};
