const externals = require("webpack-node-externals")

module.exports = slsw => ({
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },
  target: "node",
  module: { rules: [{ test: /\.tsx?$/, loader: "ts-loader" }] },
  externals: [externals()]
})
