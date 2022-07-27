const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        // clean: true,
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[name]-[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    { loader: "style-loader", options: { injectType: "singletonStyleTag" } },
                    "css-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "./src/template.html" }),],
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.squooshMinify,
                    // options: {
                    //     encodeOptions: {
                    //         mozjpeg: { quality: 100 },
                    //         webp: { lossless: 1 },
                    //         avif: { cqLevel: 0 },
                    //     },
                    // },
                },
            }),
        ],
    },
};
