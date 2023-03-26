const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    firebase_config: "./src/firebase/firebase_config.js",
    popup: "./src/popup/popup.js",
    options: "./src/options/options.js",
    background: "./src/background/background.js",
    content: "./src/content/content.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options", "options.html"),
      filename: "options.html",
      chunks: ["options"],
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/manifest.json" },
        { from: "./src/icons/*" },
        // { from: "./src/css/*" },
      ],
    }),
  ],
};
