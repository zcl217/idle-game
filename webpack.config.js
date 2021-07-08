const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sveltePreprocess = require('svelte-preprocess');
const path = require('path');
const webpack = require('webpack');

// const mode = process.env.NODE_ENV || 'development';
// const prod = mode === 'production';

//NODE_ENV=development npm run dev
const mode = process.env.NODE_ENV || 'production';
const prod = mode !== 'development';

module.exports = {
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json')),
			'~': path.resolve(__dirname, 'src')
		},
		extensions: ['.mjs', '.ts', '.tsx', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
						preprocess: sveltePreprocess({
							// https://github.com/kaisermann/svelte-preprocess/#user-content-options
							sourceMap: !prod,
							postcss: {
								plugins: [
									require("tailwindcss"),
									// require("autoprefixer"),
									require("postcss-nesting"),
								],
							},
						}),
					}
				}
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false, // necessary if you use url('/path/to/some/asset.png|jpg|gif')
						}
					}
				]
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'isDev': !prod,
			}
		})
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
	}
};
