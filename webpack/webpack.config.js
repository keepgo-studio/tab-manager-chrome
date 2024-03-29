const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production",

  watch: process.env.WATCH === "true" ? true : false,
  
  entry: {
    "background": path.resolve(__dirname, "..", "src", "background.ts"),
    "content-script": path.resolve(__dirname, "..", "src", "content-script.ts"),
    "main": path.resolve(__dirname, "..", "src", "main.ts"),
  },

  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
  },

  resolve: {
    modules: ["node_modules"],

    extensions: [".ts", ".js"],

    alias: {
      "@public": path.resolve(__dirname, "..", "public"),
      "@src": path.resolve(__dirname, "..", "src"),
      "@views": path.resolve(__dirname, "..", "src", "views"),
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "public" }],
    }),
  ],
};
