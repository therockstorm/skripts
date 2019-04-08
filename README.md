# 📜 skripts 📜

CLI for project scripts and configuration inspired by [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) and [kcd-scripts](https://github.com/kentcdodds/kcd-scripts) to prevent you from making the same modifications to every project you work on.

## Usage

Run `npm install --save-dev skripts` to install the CLI.

```
Usage: skripts [options] [command]

Options:
  --verbose                        enable additional logging
  -h, --help                       output usage information

Commands:
  clean [options] <dir> [dirs...]   clean specified dir(s)
  docker-publish [options] <image>  build and publish docker container
  jest [options]                    test files in `test` dir
  tslint                            lint files
  pre-commit                        lint and format files
  prettier                          format files
```

Use it in your `package.json` file:

```javascript
{
  ...
  "scripts": {
    "clean": "skripts clean dist --pattern '*.js'",
    "format": "skripts prettier"
    "lint": "skripts tslint",
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

Unlike `react-scripts`, you can override `skripts` configuration. This enables editor integration for tools that require local configuration like `tslint`:

```yaml
# In your tslint.yml file
extends: ["./node_modules/skripts/tslint.js"]
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

## TODO

- [ ] .editorconfig
