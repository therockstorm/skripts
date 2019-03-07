#!/usr/bin/env node
import program from "commander"
import {
  clean,
  dockerPublish,
  jest,
  preCommit,
  prettier,
  tslint
} from "./skripts"

const v = (opts: any) => opts && opts.parent && opts.parent.verbose

program.option("--verbose", "enable additional logging")

program
  .command("clean <dir> [dirs...]")
  .option("-p, --pattern <string>", "passed to `find -name` shell command")
  .description("clean specified dir(s)")
  .action((dir, dirs, opts) => clean(dir, dirs, opts.pattern, v(opts)))

program
  .command("docker-publish <image>")
  .option("--tag <string>", "image tag")
  .description("build and publish docker container")
  .action((image, opts) => dockerPublish(image, opts.tag, v(opts)))

program
  .command("jest")
  .option("--watch", "watch files for changes and re-run tests")
  .description("test files in `test` dir")
  .action(opts => jest([opts.watch ? "--watch" : ""], v(opts)))

program
  .command("tslint")
  .description("lint files")
  .action(opts => tslint(v(opts)))

program
  .command("pre-commit")
  .description("lint and format files")
  .action(opts => preCommit(v(opts)))

program
  .command("prettier")
  .description("format files")
  .action(opts => prettier(v(opts)))

program.parse(process.argv)
