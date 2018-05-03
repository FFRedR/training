const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
    var env = env.production ? "production" : "development";
    process.env.NODE_ENV = env;
    console.log(process.env.NODE_ENV);
    return {
        mode: env,
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: false,
            port: 8000
        },
        context: path.resolve(__dirname, 'src'),
        entry: {
            app: './app',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: process.env.NODE_ENV === "production" ? true : false,
                                importLoaders: 1
                            },
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './postcss.config.js',
                                    ctx: {
                                        env: env,
                                        cssnext: {},
                                    }
                                },

                            }
                        }, {
                            loader: 'resolve-url-loader'
                        }],
                    })
                }, {
                    test: /\.(scss|sass)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader", // translates CSS into CommonJS
                            options: {
                                minimize: process.env.NODE_ENV === "production" ? true : false,
                                url: true,
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './postcss.config.js',
                                    ctx: {
                                        env: env,
                                        cssnext: {},
                                    }
                                },

                            }
                        }, {
                            loader: 'resolve-url-loader'
                        }, {
                            loader: "sass-loader", // compiles Sass to CSS
                            options: {
                                sourceMap: true
                            }
                        }],
                    }),
                    exclude: /node_modules/
                }, {
                    test: /\.(pug|jade)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].html',
                                outputPath: ''
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'html-loader'
                        },
                        {
                            loader: 'pug-html-loader',
                            options: {
                                pretty: true,
                            }
                        },
                        /*{
                            loader: 'html-loader'
                        },
                        {
                            loader: 'pug-html-loader',
                            options: {
                                pretty: true,
                            }
                        },*/

                    ],
                    exclude: /node_modules/

                }, {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                useRelativePath: false
                            }
                        }
                    ]
                }, {
                    test: /\.woff$|\.woff2$|\.eot$|\.ttf$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/',
                                useRelativePath: false
                            }
                        }
                    ]
                },


            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss']
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),///очистка dist
            new ExtractTextPlugin("css/main.css", {
                allChunks: true,
            }),
            /*new HtmlWebpackPlugin({
                template: './index.pug',
            })*/
        ]
    }
};