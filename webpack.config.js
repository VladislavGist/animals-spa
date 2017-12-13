let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
require('babel-polyfill')

const PROCESS_ENV = process.env.NODE_ENV
// const URL_PATH = (PROCESS_ENV === 'development') ? 'http://localhost:8080' : 'https://still-anchorage-46659.herokuapp.com'
//когда буду билдить на рабочий сервер, то вернуть верхнюю строку и в конце указать его
const URL_PATH = (PROCESS_ENV === 'development') ? 'http://localhost:8080' : 'http://oblako.pet'

module.exports = {
	entry: ['whatwg-fetch', 'babel-polyfill', './src/index.js'],
	output: {
		path: __dirname + '/node/public/',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: '#cheap-module-source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: ['/node_modules/', '/public/']
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader',
				exclude: ['/node_modules/', '/public/']
			},
			{
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract('style', 'css-loader!autoprefixer-loader!resolve-url-loader!sass-loader?sourceMap'),
				exclude: ['/node_modules/', '/public/']
			},
			{
				test: /\.jsx$/,
				loader: 'react-hot-loader!babel',
				exclude: ['/node_modules/', '/public/']
			},
			{ test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=10000' },
			{ test: /\.((ttf|eot|woff)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff)$/, loader: 'file?publicPath=./&name=fonts/[name].[ext]' },
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('bundle.css', {
			allChunks: true,
			disable: process.env.NODE_ENV === 'development'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(PROCESS_ENV),
				URL: JSON.stringify(URL_PATH)
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}