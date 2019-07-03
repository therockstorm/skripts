import { config, resolveBin, run } from "./utils"

export const clean = (
  dir: string,
  dirs: string[],
  pattern: string,
  verbose: boolean
) => {
  const ds = [dir, ...dirs]
  return pattern
    ? ds.forEach(d =>
        run("find", [d, "-type", "f", "-name", pattern, "-delete"], verbose)
      )
    : ds.forEach(d => run("rm", ["-rf", d], verbose))
}

export const dockerPublish = (image: string, tag: string, verbose: boolean) => {
  const nameTag = tag ? `${image}:${tag}` : image
  run("docker", ["build", "-t", nameTag, "."], verbose)
  run("docker", ["tag", nameTag, `${image}:latest`], verbose)
  run("docker", ["push", image], verbose)
}

export const jest = (args: string[], verbose: boolean) =>
  run(
    "jest",
    ["--config", JSON.stringify(require("./config/jest.config.js")), ...args],
    verbose,
    {
      ENVIRONMENT: "test"
    }
  )

export const preCommit = (verbose: boolean) => {
  const status = run(
    resolveBin("lint-staged"),
    ["--config", config("lintstagedrc.js")],
    verbose
  )
  if (status !== 0) process.exit(status || -1)
}

export const prettier = (verbose: boolean) =>
  run(
    "prettier",
    [
      "--config",
      config("prettier.config.js"),
      "--ignore-path",
      config(".prettierignore"),
      "--write",
      "./**/*.+(js|jsx|ts|tsx|json|yml|yaml|md|html|css|less|scss|graphql)"
    ],
    verbose
  )

export const tslint = (verbose: boolean) =>
  run(
    "tslint",
    [
      "--config",
      config("tslint.js"),
      "./**/*.ts?(x)",
      "--exclude",
      "./node_modules/**/*.ts?(x)",
      "--fix"
    ],
    verbose
  )
