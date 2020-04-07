#!/usr/bin/env node
import { join } from "path"
import { exit, run } from "./utils"
import { sync } from "glob"

const [executor, ignoredBin, script, ...args] = process.argv

const spawnScript = (): never => {
  try {
    const path = require.resolve(join(__dirname, "./scripts", script))
    const res = run(executor, [path, ...args], true)
    return res.signal ? handleSignal(res.signal) : exit(res.status)
  } catch (error) {
    throw new Error(`Unknown script "${script}".`)
  }
}

const handleSignal = (signal: string | null): never => {
  const msg = "'${script}' failed because the process exited"
  if (signal === "SIGKILL" || signal === "SIGTERM") console.log(msg)
  return exit(1)
}

if (script) spawnScript()
else {
  const path = join(__dirname, "scripts/")
  const commands = sync(join(__dirname, "scripts", "*"))
    .filter((s) => !s.endsWith(".ts") && !s.endsWith(".map"))
    .map((s) => s.replace(path, "").replace(/\.js$/, ""))
    .join("\n  ")
    .trim()
  console.log(`\n
Usage: ${ignoredBin} [command] [options]
Commands:
  ${commands}
Options:
  Script-dependent, the args you pass will be forwarded to the respective tool.
\n`)
}
