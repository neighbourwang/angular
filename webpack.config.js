var path = require('path');
var webpack = require('webpack');

module.exports = {
    //Starting point of the application
    devtool:'eval',
    context: path.resolve(__dirname, 'app'),
    entry: [
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
        './../public/app/app.js',
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'forCloud.app.js',
        publicPath:'/static/'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve:{
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test:/\.jsx?$/,
                loader: 'react-hot-loader/webpack', 
                exclude: /build|lib|node_modules/,               
                include:path.join(__dirname,'public')
            },
            {
                test:/\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                },
                include:path.join(__dirname,'public')
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.woff(\d+)?$/, loader: 'url?prefix=font/&limit=5000&mimetype=application/font-woff' },
            { test: /\.ttf$/, loader: 'file?prefix=font/' },
            { test: /\.eot$/, loader: 'file?prefix=font/' },
            { test: /\.svg$/, loader: 'file?prefix=font/' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};

