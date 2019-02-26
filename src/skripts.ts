import { error, log } from '@therockstorm/utils'
import { spawnSync } from 'child_process'
import { join } from 'path'

export const build = () => run('serverless', ['webpack'])

export const clean = (dir: string, ext: string) =>
  dir && ext
    ? run('find', [dir, '-type', 'f', '-name', ext, '-delete'])
    : run('rm', ['-rf', dir])

export const format = () =>
  run('prettier', [
    '--config',
    config('prettier.config.js'),
    '--ignore-path',
    config('.prettierignore'),
    '--write',
    './**/*.+(js|jsx|ts|tsx|json|yml|md|html|css|less|scss|graphql)'
  ])

export const jest = (args: string[] = []) =>
  run(
    'jest',
    ['--config', JSON.stringify(require('./config/jest.config.js')), ...args],
    {
      ENVIRONMENT: 'test'
    }
  )

export const lint = () =>
  run('tslint', [
    '--config',
    config('tslint.js'),
    './**/*.ts?(x)',
    '--exclude',
    './node_modules/**/*.ts?(x)',
    '--fix'
  ])

export const slsDeploy = () => run('serverless', ['deploy', '--verbose'])

export const slsInvoke = (func: string) =>
  run('serverless', ['invoke', 'local', '--function', func], {
    ENVIRONMENT: 'local'
  })

export const slsLogs = (func: string) =>
  run('serverless', ['logs', '--function', func])

export const slsRemove = () => run('serverless', ['remove', '--verbose'])

export const test = () => {
  lint()
  jest()
  pack()
}

const config = (p: string) =>
  join(__dirname, `./config/${p}`).replace(process.cwd(), '.')

const pack = () => run('serverless', ['package'])

const run = (cmd: string, args: string[], env?: NodeJS.ProcessEnv) => {
  try {
    log(cmd, args)
    spawnSync(cmd, args, { env: { ...process.env, ...env }, stdio: 'inherit' })
  } catch (e) {
    error(e.message || e)
  }
}
