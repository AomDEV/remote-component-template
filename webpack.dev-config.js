const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config");

module.exports = {
    entry: "./src/dev-server.tsx",
    plugins: [
        ...config.plugins,
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html"
        }),
        new webpack.EvalSourceMapDevToolPlugin({}),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: config.module,
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, "public")
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization"
        }
    },
    resolve: {
        alias: {
            "remote-component.config.js": path.resolve("./remote-component.config.js")
        },
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
        "@paciolan/remote-component": require("./node_modules/@paciolan/remote-component")
    }
};