const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractCss = new ExtractTextPlugin({
    filename: 'css/[name].css',
    disable: process.env.NODE_ENV === 'development',
});

const assetJsDir = path.resolve(__dirname, 'assets', 'js');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'assets', 'main.js'),
        bladeIndex: path.resolve(assetJsDir, 'bladeIndex.js'),
        bladeForm: path.resolve(assetJsDir, 'bladeForm.js'),
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
                use: extractCss.extract({
                    use: [
                        {
                            loader: 'css-loader',
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer'),
                                        require('cssnano')({
                                            preset: 'default',
                                        }),
                                    ];
                                },
                            },
                        }, {
                            loader: 'sass-loader'
                        },
                    ],
                    // use style-loader in development
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer'),
                                        require('cssnano')({
                                            preset: 'default',
                                        }),
                                    ];
                                },
                            },
                        }
                    ],
                    fallback: 'style-loader',
                })
            }, {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../'
                }
            }
        ],
    },
    plugins: [
        extractCss,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            minChunks: Infinity,
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'assets', 'static'),
            to: 'static',
        }]),
        new CleanWebpackPlugin([path.resolve(__dirname, 'web', 'dist')]),
    ],
};
