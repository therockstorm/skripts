import { spawnSync, SpawnSyncReturns } from "child_process"
import { existsSync, realpathSync } from "fs"
import { dirname, join } from "path"
import readPkgUp from "read-pkg-up"
import { sync } from "which"

const pkg = readPkgUp.sync({ cwd: realpathSync(process.cwd()) })
const appDir = dirname((pkg || { path: "" }).path)
const empty = Buffer.from("", "utf8")

const fromRoot = (...p: string[]): string => join(appDir, ...p)

export const hasFile = (...p: string[]): boolean => existsSync(fromRoot(...p))

export const config = (p: string): string =>
  join(__dirname, `./config/${p}`).replace(process.cwd(), ".")

export const resolveBin = (
  mod: string,
  { exec = mod, cwd = process.cwd() } = {}
): string => {
  let path
  try {
    path = realpathSync(sync(exec))
  } catch {
    // ignore
  }
  try {
    const modPath = require.resolve(`${mod}/package.json`)
    // eslint-disable-next-line
    const { bin } = require(modPath)
    const binPath = join(
      dirname(modPath),
      typeof bin === "string" ? bin : bin[exec]
    )
    return binPath === path ? exec : binPath.replace(cwd, ".")
  } catch (err) {
    if (path) return exec
    throw err
  }
}

export const resolveSelf = (): string =>
  pkg && pkg.packageJson.name === "skripts"
    ? `node ${require.resolve("./").replace(process.cwd(), ".")}`
    : resolveBin("skripts")

export const exit = (s: number | null): never =>
  process.exit(s === null ? -1 : s)

export const run = (
  cmd: string,
  args: string[],
  verbose = false,
  env: NodeJS.ProcessEnv = {}
): SpawnSyncReturns<Buffer> => {
  try {
    if (verbose) console.log(cmd, args)
    return spawnSync(cmd, args, {
      env: { ...process.env, ...env },
      stdio: "inherit"
    })
  } catch (e) {
    console.error(e.message || e)
    return {
      pid: 0,
      output: [],
      stdout: empty,
      stderr: empty,
      signal: null,
      status: 1
    }
  }
}
