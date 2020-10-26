const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// 当前环境是生成环境
const IS_PRO = process.env.NODE_ENV === "production"

const base = {
    entry: path.resolve(__dirname, "src"),
    output: {
        filename: IS_PRO ? "index.min.js" : "index.js",
        path: path.resolve(__dirname, "dist"),
        library: "MObserver",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            allowTsInNodeModules: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    plugins: [new CleanWebpackPlugin()],
}

// development
const dev = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
}

// production
const pro = {
    mode: "production",
    devtool: "cheap-module-source-map",
}

module.exports = merge(base, IS_PRO ? pro : dev)
