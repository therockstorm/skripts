const { resolveSelf } = require("../utils")

const self = resolveSelf()

module.exports = {
  "*.{ts,tsx}": [`${self} tslint`, `${self} prettier`, "git add"],
  "*.{js,jsx,json,yml,yaml,md,html,css,less,scss,graphql}": [
    `${self} prettier`,
    "git add"
  ]
}
