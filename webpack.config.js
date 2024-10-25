const path = require('path');

module.exports = {
  entry: './app.js', // Adjust this path if your entry file is elsewhere
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'production', // Change to 'development' if needed
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Install babel-loader if using ES6/React
        },
      },
    ],
  },
};
