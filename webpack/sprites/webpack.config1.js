const path = require('path')
const webpack = require('webpack')
// const PurifyCSS = require('purifycss-webpack')
// const golb = require('glob-all')
const ExtractTextPlugin = require("extract-text-webpack-plugin");//生产模式将css分离的
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleane = require('clean-webpack-plugin')
module.exports = {
    entry: {
        pageA: './index.js',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        // publicPath: '/',   // 发布的路径,因为现在不是在服务器上所以相对路径来弄
        filename: '[name].bundle.[hash:5].js',
        chunkFilename: '[name].chunk.js'  // chunkname个人的理解是未被列在entry中，却又需要被打包出来的文件命名配置。什么场景需要呢？咱们项目就遇到过，在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: {   //用什么将样式加载到页面上
                //         loader: 'style-loader',
                //         options: {
                            
                //         }
                //     },
                //     use: [{
                //         loader: 'css-loader',
                //         //loader从后往前处理 执行css-loader 再 执行style-loader放到页面上
                //         options:{
                //             minimize: true, //css压缩
                //             // module:true   //css模块化
                //             }
                //         },
                //         {
                //         loader: 'postcss-loader',
                //         options: {
                //             ident: 'postcss',
                //             plugins: [
                //                 require('postcss-sprites')({
                //                     spritePath: 'dist/img', //指定生成路径
                //                     // retina: true // 苹果设备 retina视网膜屏 2倍大小的图标 图片要设置@2x
                //                 }), //不要去改图片后缀名不然会出错
                //                 require('autoprefixer')()
                //             ]
                //         }
                //         }
                //     ]
                // })
                // remove ExtractTextPlugin
                    use: [{
                        loader: 'css-loader',
                        //loader从后往前处理 执行css-loader 再 执行style-loader放到页面上
                        options:{
                            minimize: true, //css压缩
                            // module:true   //css模块化
                            }
                        },
                        {
                        loader: 'postcss-loader',
                        // options: {
                        //     ident: 'postcss',
                        //     plugins: [
                        //         require('postcss-sprites')({
                        //             spritePath: 'dist/img', //指定生成路径
                        //             // retina: true // 苹果设备 retina视网膜屏 2倍大小的图标 图片要设置@2x
                        //         }), //不要去改图片后缀名不然会出错
                        //         require('autoprefixer')()
                        //     ]
                        // }
                        }
                    ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // { //file-loader
                    //     loader: 'file-loader',
                    //     options: {
                    //         publicPath: '..',//相对css文件来讲
                    //         // outputPath: './img/', 
                    //         // useRelativePath: true
                    //         name: 'img/[name].png',
                    //     }
                    // },
                     { 
                        loader: 'url-loader',
                        options: {
                            limit: 100000,  //小于多少b的资源，用base64编码
                            name: 'img/[name].[hash:5].[ext]',
                            publicPath: '..',//相对css文件来讲，在服务器上时不用这个
                            // outputPath: 'img/', 
                        }
                    },
                    {//图片压缩
                        loader: 'img-loader',
                        options: {
                            pngquant: {   //对png的进行处理
                                quality: 80
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
       
        // new webpack.optimize.UglifyJsPlugin(),
        // new ExtractTextPlugin({
        //     filename: "css/[name].[hash:5].css",
        //     // allChunks: false //提取范围，设定false只会提取初始化的
        // }),
        // new PurifyCSS({
        //     paths: golb.sync([
        //         path.resolve(__dirname, './*.html'),
        //         path.resolve(__dirname, './src/*.html')
        //     ])
        // }), //放在ExtractTextPlugin后面
        // // new webpack.ProvidePlugin({
        // //     $: 'jquery'
        // // })
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     // inject: true,
        //     // chunks: ['app'],  //指定了只会将入口相关的加载到页面中
        //     minify: {
        //         // collapseWhitespace: true
        //     }
        // }),
        new cleane(['dist'])
    ]
}