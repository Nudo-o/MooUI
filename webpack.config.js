import path from "path"
import { fileURLToPath } from "url"
import HTMLWebpackPlugin from "html-webpack-plugin"
import TerserWebpackPlugin  from "terser-webpack-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
        watchFiles: [ "public/*.html", "src/*.*" ]
    },
    optimization: {
        minimizer: [ new TerserWebpackPlugin() ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        })
    ],
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