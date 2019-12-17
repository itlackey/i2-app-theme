#!/usr/bin/env node
const { src, dest } = require("gulp");
const { installTheme } = require('./utils/installer.js');

const path = require("path");
require("yargs") // eslint-disable-line
  .command(
    ["install [path]", "$0 [path]"],
    "install the I2 app theme.",
    yargs => {
      yargs.positional("path", {
        describe: "where to copy the asset files",
        default: "."
      });
    },
    async argv => {
      await installTheme(argv.path, argv.verbose);
      // const destPath = path.join(process.cwd(), argv.path);

      // if (argv.verbose) console.log(`Installing to ${destPath}`);

      // await src(__dirname + "/dist/**/*.*").pipe(dest(destPath));
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging"
  }).argv;
