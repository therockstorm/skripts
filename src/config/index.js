module.exports = {
  jest: require("./jest.config"),
  lintStaged: require("./lintstagedrc"),
  prettier: require("./prettier.config"),
  serverless: require("./serverless"),
  webpack: slsw => require("./webpack.config")(slsw)
}
