import { config, hasFile, resolveBin, run } from "./utils"

const exit = (s: number | null): never => process.exit(s === null ? -1 : s)

export const clean = (
  dir: string,
  dirs: string[],
  pattern: string,
  verbose: boolean
): void => {
  const ds = [dir, ...dirs]
  pattern
    ? ds.forEach(d =>
        run("find", [d, "-type", "f", "-name", pattern, "-delete"], verbose)
      )
    : ds.forEach(d => run("rm", ["-rf", d], verbose))
}

export const dockerPublish = (
  image: string,
  tag: string,
  verbose: boolean
): void => {
  const nameTag = tag ? `${image}:${tag}` : image
  run("docker", ["build", "-t", nameTag, "."], verbose)
  run("docker", ["tag", nameTag, `${image}:latest`], verbose)
  run("docker", ["push", image], verbose)
}

export const jest = (args: string[], verbose: boolean): never =>
  exit(
    run(
      "jest",
      // eslint-disable-next-line
      ["--config", JSON.stringify(require("./config/jest.config.js")), ...args],
      verbose,
      {
        ENVIRONMENT: "test"
      }
    )
  )

export const preCommit = (verbose: boolean): never =>
  exit(
    run(
      resolveBin("lint-staged"),
      ["--config", config("lintstagedrc.js")],
      verbose
    )
  )

export const prettier = (verbose: boolean): never =>
  exit(
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
  )

export const eslint = (verbose: boolean): void => {
  const c =
    !hasFile(".eslintrc") && !hasFile(".eslintrc.js")
      ? ["--config", config("eslint.js")]
      : []

  exit(
    run("eslint", [...c, "--ext", ".ts,.tsx,.js,.jsx", "--fix", "."], verbose)
  )
}
