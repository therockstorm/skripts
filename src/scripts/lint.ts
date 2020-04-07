import { config, exit, hasFile, resolveBin, run } from "../utils"

const args = process.argv.slice(2)

const c =
  !args.includes("--config") &&
  !hasFile(".eslintrc") &&
  !hasFile(".eslintrc.js")
    ? ["--config", config("eslint.js")]
    : []

const res = run(resolveBin("eslint"), [
  ...c,
  "--ext",
  ".ts,.tsx,.js,.jsx",
  ...args,
  ".",
])

exit(res.status)
