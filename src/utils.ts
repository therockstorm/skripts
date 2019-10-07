import { error, log, thrw } from "@therockstorm/utils"
import { spawnSync } from "child_process"
import { existsSync, realpathSync } from "fs"
import { dirname, join } from "path"
import readPkgUp from "read-pkg-up"
import { sync } from "which"

const pkg = readPkgUp.sync({ cwd: realpathSync(process.cwd()) })
const appDir = dirname((pkg || { path: "" }).path)

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
    return path ? exec : thrw(err)
  }
}

export const resolveSelf = (): string =>
  pkg && pkg.packageJson.name === "skripts"
    ? `node ${require.resolve("./").replace(process.cwd(), ".")}`
    : resolveBin("skripts")

export const run = (
  cmd: string,
  args: string[],
  verbose: boolean,
  env: NodeJS.ProcessEnv = {}
): number | null => {
  try {
    if (verbose) {
      log(cmd, args)
    }
    return spawnSync(cmd, args, {
      env: { ...process.env, ...env },
      stdio: "inherit"
    }).status
  } catch (e) {
    error(e.message || e)
    return 1
  }
}
