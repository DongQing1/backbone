// 引入插件
var webpack = require('webpack');
// 引入压缩js的插件
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//定义配置
module.exports = {
	// 定义入口文件
	entry:'./js/route/router.js',
	// 发布文件
	output:{
		filename:'./pack/pack.js'
	},
	//css加载机
	module: {
		loaders: [
			{
				// 加载css
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	// 使用插件
	plugins:[
		new UglifyJsPlugin()
	]
}