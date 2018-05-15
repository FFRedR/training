const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
    process.env.NODE_ENV = env;
    console.log(process.env.NODE_ENV);
    return {
        mode: env,
        devtool: process.env.NODE_ENV === "production" ? "" : "source-map",
        context: path.resolve(__dirname, 'src'),
        entry: {
            app: './app',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js',
            chunkFilename: 'lib/chunk-[name].js',
        },
        /*externals: {///если надо подключать внешние файлы через script, но оставить import, но без внедрения в бандл
            jquery: 'jQuery'
        },*/
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                    libs: {
                        minSize: 3000,
                        test: /[\\/]lib[\\/]js[\\/]/,
                        name(a, b) {
                            //console.log(b[0].name);
                            return b[0].name
                        },
                        chunks: "async",
                        //enforce: true,
                        //priority: -1,
                    },
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV === "production" ? false : true,
                                minimize: process.env.NODE_ENV === "production" ? true : false,
                                importLoaders: 1
                            },
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV === "production" ? false : true,
                                config: {
                                    path: './postcss.config.js',
                                    ctx: {
                                        env: env,
                                        cssnext: {},
                                    }
                                },

                            }
                        }, /*{
                            loader: 'resolve-url-loader'
                        }*/],
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
                                sourceMap: process.env.NODE_ENV === "production" ? false : true,
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV === "production" ? false : true,
                                config: {
                                    path: './postcss.config.js',
                                    ctx: {
                                        env: env,
                                        cssnext: {},
                                    }
                                },

                            }
                        }/*, {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV === "production" ? false : true,
                            }
                        }*/, {
                            loader: "sass-loader", // compiles Sass to CSS
                            options: {
                                sourceMap: process.env.NODE_ENV === "production" ? false : true,
                            }
                        }],
                    }),
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
                    ],

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
            extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
            modules: ["node_modules"]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),///очистка dist
            new ExtractTextPlugin("css/[name].css", {
                allChunks: true,
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        ]
    }
};