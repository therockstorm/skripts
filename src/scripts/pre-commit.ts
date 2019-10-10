import { config, exit, hasFile, resolveBin, run } from "../utils"

const args = process.argv.slice(2)

const c =
  !args.includes("--config") &&
  !hasFile(".lintstagedrc'") &&
  !hasFile("lint-staged.config.js")
    ? ["--config", config("lintstagedrc.js")]
    : []

const res = run(resolveBin("lint-staged"), [...c, ...args])

exit(res.status)
