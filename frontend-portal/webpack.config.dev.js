var webpack = require("webpack");
var rootPath = process.cwd();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");


module.exports = {
	entry: {
		common : [rootPath+"/src/common/common.js"],
		login  : [rootPath+"/src/login/js/login.js"],
		products  : [rootPath+"/src/products/js/products.js"],
		portal  : [rootPath+"/src/portal/js/portal.js"]
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
			{test:/\.(png|jpg)$/, loader:'url-loader?limit=8192'},
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
		    chunks: ['common','portal'],
		    template: 'src/portal/portal.ejs',
		    chunksSortMode : 'none',
		    hash: false
		}),
		new HtmlWebpackPlugin({
		    filename: 'login.html',
		    chunks: ['common','login'],
		    template: 'src/login/login.ejs',
		    chunksSortMode : 'none',
		    hash: false
		}),
		new HtmlWebpackPlugin({
		    filename: 'products.html',
		    chunks: ['common','products'],
		    template: 'src/products/products.ejs',
		    chunksSortMode : 'none',
		    hash: false
		}),
	]
}
