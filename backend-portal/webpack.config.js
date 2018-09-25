var webpack = require("webpack");
var rootPath = process.cwd();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");


module.exports = {
	entry: {
		common : [rootPath+"/src/common/common.js","webpack-dev-server/client?http://0.0.0.0:4201/", "webpack/hot/dev-server"]
	},
	output: {
		path: rootPath+'/dist/',
		filename: '[name].js',
		publicPath: '/',
		chunkFilename: "[name].[id].[chunkhash:8].min.js"
	},
	module: {
		loaders: [
			{
				exclude: /(node_modules|bower_components)/,
				test: /\.js$/,
				loader: 'babel-loader?presets[]=es2015'
			},
			{test:/\.less$/, loader:'style-loader!css-loader!less-loader'},
			{test:/\.css$/, loader:'style-loader!css-loader'},
			{test:/\.(png|jpg|gif)$/, loader:'url-loader?limit=8192'},
			{
			    test: /\.ejs$/,
			    loader: 'ejs-loader?variable=data'
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
		    filename: 'login.html',
		    chunks: ['common'],
		    template: 'src/login/index.ejs',
		    chunksSortMode : 'none',
		    hash: false
		})
	]
}
