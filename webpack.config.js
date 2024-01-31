const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
	entry: "/app/index.js",
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
};
