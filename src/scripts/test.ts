import { exit, hasFile, resolveBin, run } from "../utils"

const args = process.argv.slice(2)

const c =
  !args.includes("--config") && !hasFile("jest.config.js")
    ? // eslint-disable-next-line
      ["--config", JSON.stringify(require("../config/jest.config.js"))]
    : []

const res = run(resolveBin("jest"), [...c, ...args], false, {
  ENVIRONMENT: "test",
})

exit(res.status)
