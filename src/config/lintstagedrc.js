const { resolveSelf } = require("../utils")

const self = resolveSelf()

module.exports = {
  "*.{js,jsx,ts,tsx}": [`${self} lint`, `${self} format`],
  "*.{json,yml,yaml,md,html,css,less,scss,graphql}": [`${self} format`],
}
