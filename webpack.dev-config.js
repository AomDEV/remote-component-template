const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    entry: "./src/dev-server.tsx",
    plugins: [
        ...config.plugins,
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html"
        }),
        new webpack.EvalSourceMapDevToolPlugin({}),
        new webpack.HotModuleReplacementPlugin(),
        new TsconfigPathsPlugin({}),
        new NodePolyfillPlugin()
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
        fallback: {
            "@": path.resolve("./src")
        },
    },
    externals: {
        "@paciolan/remote-component": require("./node_modules/@paciolan/remote-component")
    }
};