const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = env => {
    var env = env.production ? "production" : "development";
    process.env.NODE_ENV = env;
    console.log(process.env.NODE_ENV);
    return {
        mode: env,
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            hot: false,
            compress: false,
            port: 8000,
            open: true,
            watchContentBase: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        },
        context: path.resolve(__dirname, 'src'),
        entry: {
            app: './app',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js',
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
                    use: /*['css-hot-loader'].concat(*/ExtractTextPlugin.extract({
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
                    })/*)*/,
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
                            loader: 'html-loader',
                            options: {
                                interpolate: true
                            }
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
            new ExtractTextPlugin("css/[name].css", {
                allChunks: true,
            }),
            /*new HtmlWebpackPlugin({
                template: './index.pug',
            })*/
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            /*new BrowserSyncPlugin({
                // browse to http://localhost:3000/ during development,
                // ./public directory is being served
                host: 'localhost',
                port: 8080,
                server: { baseDir: ['dist'] },
            })*/
        ]
    }
};