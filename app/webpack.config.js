const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const assetJsDir = path.resolve(__dirname, 'assets', 'js');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'assets', 'main.js'),
        bladeIndex: path.resolve(assetJsDir, 'bladeIndex.js'),
        bladeForm: path.resolve(assetJsDir, 'bladeForm.js'),
        bladeFind: path.resolve(assetJsDir, 'bladeFind.js'),
        mercMissionIndex: path.resolve(assetJsDir, 'mercMissionIndex.js'),
        mercMissionForm: path.resolve(assetJsDir, 'mercMissionForm.js'),
        mercMissionStart: path.resolve(assetJsDir, 'mercMissionStart.js'),
        userEdit: path.resolve(assetJsDir, 'userEdit.js'),
        mainPage: path.resolve(assetJsDir, 'mainPage.js'),
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../'
                }
            }
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                js: {
                    name: 'main',
                    test: /((\/node_modules\/.*)|(main.js))$/,
                    chunks: 'all',
                },
                styles: {
                    name: 'main',
                    test: /\.s?css$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                }
            }
        }
    },
    plugins: [
        new OptimizeCSSAssetsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'assets', 'static'),
            to: 'static',
        }]),
        new CleanWebpackPlugin([path.resolve(__dirname, 'public', 'dist')]),
    ],
};
