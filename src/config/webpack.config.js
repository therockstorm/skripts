const externals = require("webpack-node-externals")

const isLocal = slsw.lib.webpack.isLocal

module.exports = slsw => ({
  devtool: "source-map",
  entry: slsw.lib.entries,
  externals: [externals()],
  mode: isLocal ? "development" : "production",
  module: { rules: [{ test: /\.tsx?$/, loader: "ts-loader" }] },
  performance: { hints: false },
  resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },
  target: "node"
})
