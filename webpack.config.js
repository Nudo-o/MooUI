const path = require("path")
const TerserWebpackPlugin = require("terser-webpack-plugin")

export default {
    mode: "development",
    target: [ "web", "es5" ],
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devServer: {
        port: 4000,
        open: true,
        hot: true,
        watchFiles: [ "src/*.*" ]
    },
    optimization: {
        minimizer: [ new TerserWebpackPlugin() ]
    },
    resolve: {
        extensions: [ ".ts", ".js" ]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node-modules/
        }]
    }
}
