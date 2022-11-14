const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    firebase_config: "./src/firebase/firebase_config.js",
    popup: "./src/popup/popup.js",
    options: "./src/options/options.js",
    background: "./src/background/background.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
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
        // { from: "./src/background/background.js" },
        { from: "./src/content/content.js" },
        { from: "./src/icons/*" },
        { from: "./src/css/*" },
      ],
    }),
  ],
};
