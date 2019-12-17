#!/usr/bin/env node
const { installTheme, installAspnetAssets } = require('./utils/installer.js');

require("yargs") // eslint-disable-line
  .command(
    ['install [path]', '$0 [path]'],
    'install the I2 app theme.',
    (yargs) => {
      yargs.positional('path', {
        describe: 'where to copy the asset files',
        default: '.',
      });
    },
    async (argv) => {
      await installTheme(argv);
    },
  )
  .command(
    ['install-aspnet [path]'],
    'install the I2 app theme and aspnet assets.',
    (yargs) => {
      yargs.positional('path', {
        describe: 'where to copy the asset files',
        default: '.',
      });
    },
    async (argv) => {
      await installAspnetAssets(argv);
    },
  )
  .option('name', {
    alias: 'n',
    type: 'string',
    description: 'The name of the application. This is used to replace tokens in theme assets.',
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  }).argv;
