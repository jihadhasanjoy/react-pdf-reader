const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = env => ({
    entry: './src/index.tsx',
    output: {
        filename: 'scripts/bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    plugins: [
        new Dotenv({
            path: `./.env.${env}`
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'src', 'index.html') }),
        new CopyWebpackPlugin([{ from: './src/resources', to: 'resources' }])
    ],
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.(png|jpg|gif|pdf)$/, use: [{ loader: 'url-loader', options: { limit: 8192 } }] },
        ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    mode: "development",
    devtool: 'source-map',
    devtool: 'cheap-eval-source-map'
});

