const { resolveSelf } = require("../utils")

const self = resolveSelf()

module.exports = {
  "*.{js,jsx,ts,tsx}": [`${self} eslint`, `${self} prettier`, "git add"],
  "*.{json,yml,yaml,md,html,css,less,scss,graphql}": [
    `${self} prettier`,
    "git add"
  ]
}
