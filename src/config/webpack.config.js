const externals = require("webpack-node-externals")

module.exports = slsw => ({
  devtool: "source-map",
  entry: slsw.lib.entries,
  externals: [externals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  module: { rules: [{ test: /\.tsx?$/, loader: "ts-loader" }] },
  performance: { hints: false },
  resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },
  target: "node"
})
