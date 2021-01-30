const webpack = require("webpack")

module.exports = (async (slsw) => {
  const accountId = await slsw.lib.serverless.providers.aws.getAccountId()
  return {
    devtool: "source-map",
    entry: slsw.lib.entries,
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    module: { rules: [{ test: /\.tsx?$/, loader: "ts-loader" }] },
    performance: { hints: false },
    plugins: [new webpack.DefinePlugin({ AWS_ACCOUNT_ID: `${accountId}` })],
    resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },
    target: "node",
  }
})()
