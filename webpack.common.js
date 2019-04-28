const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
    process.env.NODE_ENV = env;
    console.log(process.env.NODE_ENV);
    return {
        mode: env,
        devtool: process.env.NODE_ENV === "production" ? "" : "source-map",
        entry: {
            app: './src/app',
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
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                            }
                        },
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin,
                        {
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
                        }]
                }, {
                    test: /\.(scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin,
                        {
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
                        }, {
                            loader: "sass-loader", // compiles Sass to CSS
                            options: {
                                sourceMap: process.env.NODE_ENV === "production" ? false : true,
                            }
                        }],
                }, {
                    test: /\.(pug|jade)$/,
                    use: [
                        {
                            loader: 'pug-loader'
                        }
                        /*{
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
                        },*/
                    ],

                }, {
                    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$|\.json$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                publicPath: process.env.NODE_ENV === "production" ? '../' : '',
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
                                publicPath: process.env.NODE_ENV === "production" ? '../fonts/' : '',
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
            new ForkTsCheckerWebpackPlugin(),
            new CleanWebpackPlugin(),///очистка dist
            new MiniCssExtractPlugin({ filename: "css/[name].css" }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                //Swiper: ["swiper","default"]
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.pug'
            })
        ]
    }
};