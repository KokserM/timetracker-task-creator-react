const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production', // Set to production mode to enable minification
    entry: {
        background: './src/background.js',
        contentScript: './src/contentScript.js'
        // Add other entry points (e.g. popup, options) as needed.
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // This creates dist/background.js and dist/contentScript.js
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Transpile both .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/, // Process CSS files
                use: ['style-loader', 'css-loader']
            },
            {
                // Optionally, load image assets if needed
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'images', to: 'images' },
                { from: 'icons', to: 'icons' },
                { from: 'manifest.json', to: 'manifest.json' }
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // Source maps can still be generated in production if desired.
    // If you don't need them, you can remove or change this setting.
    devtool: 'source-map',
    optimization: {
        minimize: true // Ensure code minimization is enabled
    }
};
