# 📜 skripts 📜

CLI for project scripts and configuration inspired by [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) and [kcd-scripts](https://github.com/kentcdodds/kcd-scripts) to prevent you from making the same modifications to every project you work on.

## Usage

Run `npm install --save-dev skripts` to install the CLI.

```
Usage: skripts [command] [options]
Commands:
  format
  lint
  pre-commit
  test
Options:
  Script-dependent, the args you pass will be forwarded to the respective tool.
```

Use it in your `package.json` file:

```javascript
{
  ...
  "scripts": {
    "format": "skripts format"
    "lint": "skripts lint --fix",
    "test": "skripts jest"
  },
  "husky": {
    "hooks": {
      "pre-commit": "skripts pre-commit"
    }
  }
  ...
}
```

### Overriding Config

Unlike `react-scripts`, you can override `skripts` configuration. This enables editor integration for tools that require local configuration like `eslint`:

```yaml
# In your eslint.yml file
extends: ["./node_modules/skripts/eslint.js"]
```

And TypeScript:

```json
// In your tsconfig.json file
{
  "extends": "./node_modules/skripts/base-tsconfig.json",
  "include": ["src"]
}
```

And prevents boilerplate for things like [Serverless Framework](https://serverless.com/):

```javascript
// In your serverless.js file
const { serverless } = require("skripts/config")

module.exports = {
  ...serverless,
  functions: {
    myFunction: {
      handler: "src/handler.handle",
      events: [{ http: "POST /" }]
    }
  }
}
```
