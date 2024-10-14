const path = require('path');

module.exports = {
    entry: './app.js', // Change this to your entry point
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist') // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader' // Make sure you have babel-loader installed if you're using it
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    mode: 'development' // Change to 'production' for production builds
};
