module.exports = {
    ident: 'postcss',
    plugins: [
        require('postcss-sprites')({
            spritePath: 'dist/img', //指定生成路径
            // retina: true // 苹果设备 retina视网膜屏 2倍大小的图标 图片要设置@2x
        }), //不要去改图片后缀名不然会出错
        require('autoprefixer')()
    ]
}