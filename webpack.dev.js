const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        public: 'localhost:8081'
    },
    devtool: 'source-map',
    entry: './src/client/index.js',
    mode: 'development',
    module: {
        rules: [{
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
        },{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },{
            test: /\.(gif|png|jpe?g|svg)$/,
            use: ['file-loader?name=[name].[ext]&outputPath=images']
        }]
    },
    output: {
        library: 'Client',
        libraryTarget: 'var',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
            title: 'Development'
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}
