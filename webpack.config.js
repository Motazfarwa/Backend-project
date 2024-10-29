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
      buffer: require.resolve('buffer/'),
      vm: require.resolve('vm-browserify'),
      // Add other fallbacks if necessary
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
