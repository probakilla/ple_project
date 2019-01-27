const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    resolve: { extensions: [".js"] },
    module: {
	rules: [
	    {
		test: /\.html$/,
		use: {
		    loader: "html-loader"
		}
	    },
	    {
		test: /\.css$/,
		use: ["style-loader", "css-loader"]
	    }
	]
    },
    plugins: [
	new CleanWebpackPlugin(["dist"]),
	new HtmlWebPackPlugin({
	    template: "./src/html/index.html",
	    filename: "./index.html"
	}),
	new Dotenv()
    ]
};
