const path = require('path');

module.exports = {
  mode: 'development', // Change to 'production' for production builds
  entry: './app.js', // The entry point of your application
  output: {
    filename: 'bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory
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
      fs: false, // or require.resolve('browserify-fs') if you need fs polyfills
      http: require.resolve('stream-http'), // or any alternative you need
      https: require.resolve('https-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
          options: {
            presets: ['@babel/preset-env'], // Use the env preset
          },
        },
      },
    ],
  },
  devtool: 'source-map', // Enable source maps for easier debugging
};
