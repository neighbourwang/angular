var webpack = require("webpack");
var rootPath = process.cwd();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var CleanWebpackPlugin = require('clean-webpack-plugin');  //发布前删除目录

module.exports = {
	entry: {
		common : [rootPath+"/src/common/common.js"]
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
		new HtmlWebpackPlugin({
			title: 'Custom template',
		    filename: 'portal.html',
		    chunks: ['common'],
		    template: 'src/portal/index.ejs',
		    chunksSortMode : 'none',
		    hash: false
		}),
		new HtmlWebpackPlugin({
		    filename: 'login.html',
		    chunks: ['common'],
		    template: 'src/login/index.ejs',
		    chunksSortMode : 'none',
		    hash: false
		}),
		new HtmlWebpackPlugin({
		    filename: 'products.html',
		    chunks: ['common'],
		    template: 'src/products/index.ejs',
		    chunksSortMode : 'none',
		    hash: false
		}),
		// new HtmlWebpackPlugin({
		//     filename: 'control.html',
		//     chunks: ['common'],
		//     template: 'src/control/index.ejs',
		//     chunksSortMode : 'none',
		//     hash: false
		// }),
		new HtmlWebpackPlugin({
		    filename: 'control.html',
		    chunks: ['common'],
		    template: 'src/control6/index.ejs',
		    chunksSortMode : 'none',
		    hash: false
		}),
		new CleanWebpackPlugin(['dist'])
	]
}
