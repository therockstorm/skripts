# 📜 skripts 📜

CLI for project scripts and configuration inspired by [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) and [kcd-scripts](https://github.com/kentcdodds/kcd-scripts) to prevent you from making the same modifications to every project you work on.

## Usage

Run `npm install --save-dev skripts` to install the `skripts` CLI.

```
Usage: skripts [options] [command]

Options:
  -h, --help             output usage information

Commands:
  build                  build with serverless-webpack
  clean [options] <dir>  clean specified dir
  format                 format with prettier
  sls-deploy             deploy with serverless
  sls-invoke <func>      serverless invoke specified func
  sls-logs <func>        show serverless logs for specified func
  sls-remove             remove with serverless
  jest                   test with jest
  lint                   lint with tslint
  pre-commit             lint and format
  test                   lint and test
  watch                  watch with jest
```

Use it via your `package.json` scripts like this:

```javascript
{
  ...
  "scripts": {
    "clean": "skripts clean dist --ext '*.js'",
    "format": "skripts format"
    "lint": "skripts lint",
    "test": "skripts test"
  },
  ...
}
```

### Overriding Config

Unlike `react-scripts`, `skripts` allows you to override configuration.

This enables editor integration for tools that require project-based configuration like `tslint`:

```yaml
# In your tslint.yml file
extends: ['./node_modules/skripts/tslint.js']
```

And prevents boilerplate for things like [Serverless Framework](https://serverless.com/):

```javascript
// In your serverless.js file
const { serverless } = require('skripts/config')

module.exports = {
  ...serverless,
  functions: {
    myFunction: {
      handler: 'src/handler.handle',
      events: [{ http: 'POST /' }]
    }
  }
}
```
