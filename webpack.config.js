const path = require("path");
const webpack = require("webpack");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const remoteComponentConfig = require("./remote-component.config").resolve;

const externals = Object.keys(remoteComponentConfig).reduce(
    (obj, key) => ({ ...obj, [key]: key }),
    {}
);
const isProduction = () => process.env.NODE_ENV === "production";

module.exports = {
    entry: {
        main: isProduction() ? "./src/index.tsx" : "./src/dev-server.tsx",
    },
    output: {
        libraryTarget: "commonjs",
    },
    resolve: {
        extensions: [".ts", ".tsx"],
    },
    devServer: {
        contentBase: path.join(__dirname, "public"), // Serve files from this directory
        port: 3000, // Port for the development server
        open: true, // Open the default web browser when the server starts
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            "process.env.NODE_ENV": process.env.NODE_ENV
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            reportFilename: "webpack-bundle-analyzer-report.html"
        }),
        new WebpackAssetsManifest()
    ],
    module: {
        rules: [
            {
                test: /(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    externals: {
        ...externals,
        "remote-component.config.js": "remote-component.config.js"
    }
};