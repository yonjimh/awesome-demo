//webpack.config.js
var path = require('path');

var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
	entry: {
		pageA: './index.js',
	},

	output: {
		path: path.join(__dirname, 'dist'),
		// publicPath: '/',   // 发布的路径,因为现在不是在服务器上所以相对路径来弄
		filename: '[name].bundle.[hash:5].js',
		chunkFilename: '[name].chunk.js' // chunkname个人的理解是未被列在entry中，却又需要被打包出来的文件命名配置。什么场景需要呢？咱们项目就遇到过，在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的
	},
	module: {
		rules: [{
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader'
				]
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.png$/,
				use: [
					'file-loader?name=img/[hash].[ext]' // webpack1的写法吧
				]
			}
		]
	},
	resolve: {
		modules: ["node_modules", "spritesmith-generated"]
	},
	plugins: [
		// 雪碧图插件
		new SpritesmithPlugin({
			// 目标小图标
			src: {
				// 小图标路径
				cwd: path.join(__dirname, 'src/img'),
				// 匹配小图标文件后缀名
				glob: '*.png'
			},
			target: {
				// 生成雪碧图(大图)文件存放路径
				image: path.join(__dirname, 'dist/sprites/sprite.png'),
				// 对应的样式文件存放路径
				css: path.join(__dirname, 'dist/sprites/sprites.css')
			},
			// 样式文件中,调用雪碧图的写法????
			apiOptions: {
				cssImageRef: '../sprites/sprite.png'
			},
			// 雪碧图生成算法
			spritesmithOptions: {
				algorithm: 'top-down', // 从上到下生成方向.
				padding: 2 // 每个小图标之间的间隙
			}
		})
	]
}