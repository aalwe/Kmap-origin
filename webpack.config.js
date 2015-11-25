var path = require("path");
module.exports = {
  entry: {
    app: ["./app/main.jsx"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    // publicPath: "/assets/",
    filename: "bundle.js"
  },
  module: {
  	loaders: [
  		{ test: /\.css$/, loader: "style!css"},
  		{ test: /\.less$/, loader: "style!css!less"},
  		{ test: /\.jsx$/, loader: "jsx"}
  	]
  }
};