import { config, exit, hasFile, resolveBin, run } from "../utils"

const args = process.argv.slice(2)

const c =
  !args.includes("--config") &&
  !hasFile("prettier.config.js") &&
  !hasFile("prettierrc.js")
    ? ["--config", config("prettier.config.js")]
    : []

const i =
  !args.includes("--ignore-path") && !hasFile(".prettierignore")
    ? ["--ignore-path", config(".prettierignore")]
    : []

const relativeArgs = args.map((a) => a.replace(`${process.cwd()}/`, ""))

const res = run(resolveBin("prettier"), [
  ...c,
  ...i,
  "--write",
  "./**/*.+(js|jsx|ts|tsx|json|yml|yaml|md|html|css|less|scss|graphql)",
  ...relativeArgs,
])

exit(res.status)
