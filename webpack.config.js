const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
	resolve: {
		alias: {
			"@app": path.resolve(__dirname, "/app/"),
			"@img": path.resolve(__dirname, "/app/assets/images/"),
			"@fonts": path.resolve(__dirname, "/app/assets/fonts/"),
			"@styles": path.resolve(__dirname, "/styles/"),
		},
	},
	entry: ["@app/index.js", "@styles/index.scss"],
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "public"),
		clean: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "shared",
					to: "",
					noErrorOnMissing: true,
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "",
						},
					},
					{
						loader: "css-loader",
						options: {
							url: true,
						},
					},
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "images/[name].[hash].[ext]",
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name].[hash].[ext]",
				},
			},
		],
	},
};
