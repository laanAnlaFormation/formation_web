const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
					compress: {
						drop_console: false,
					},
				},
			}),
		],
	},
});
