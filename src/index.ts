#!/usr/bin/env node
import program from 'commander'
import {
  build,
  clean,
  format,
  jest,
  lint,
  slsDeploy,
  slsInvoke,
  slsLogs,
  slsRemove,
  test
} from './skripts'

program
  .command('build')
  .description('build with serverless-webpack')
  .action(() => build())

program
  .command('clean <dir>')
  .option('--ext <string>', 'optional extension')
  .description('clean specified dir')
  .action((dir: string, { ext }) => clean(dir, ext))

program
  .command('format')
  .description('format with prettier')
  .action(() => format())

program
  .command('sls-deploy')
  .description('deploy with serverless')
  .action(() => {
    test()
    slsDeploy()
  })

program
  .command('sls-invoke <func>')
  .description('serverless invoke specified func')
  .action((func: string) => slsInvoke(func))

program
  .command('sls-logs <func>')
  .description('show serverless logs for specified func')
  .action((func: string) => slsLogs(func))

program
  .command('sls-remove')
  .description('remove with serverless')
  .action(() => slsRemove())

program
  .command('jest')
  .description('test with jest')
  .action(() => jest())

program
  .command('lint')
  .description('lint with tslint')
  .action(() => lint())

program
  .command('pre-commit')
  .description('lint and format')
  .action(() => {
    lint()
    format()
  })

program
  .command('test')
  .description('lint and test')
  .action(() => test())

program
  .command('watch')
  .description('watch with jest')
  .action(() => jest(['--watch']))

program.parse(process.argv)
