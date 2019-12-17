const { src, dest } = require('gulp');
const replace = require('gulp-replace');
const path = require('path');

async function installTheme(config) {
  const destPath = path.join(process.cwd(), config.path);

  if (config.verbose) console.log(`Installing from $${__dirname}/dist/**/*.* to ${destPath}`);

  await src(`${__dirname}/../dist/assets/**/*.*`).pipe(dest(path.join(destPath, 'assets')));
  await src(`${__dirname}/../dist/index.html`)
    .pipe(replace('{{site.title}}', config.name))
    .pipe(dest(destPath));
}

async function installESLintConfig(target, verbose) {
  const destPath = path.join(process.cwd(), target);

  if (verbose) console.log(`Installing ESLint config to ${destPath}`);

  await src(`${__dirname}/../dist/.eslintrc.js`).pipe(dest(destPath));
}

async function installAspnetAssets(config) {
  await installESLintConfig('.', config.verbose);
  await installTheme('wwwroot/', config.verbose);

  const destPath = path.join(process.cwd(), config.path, 'Views');

  if (config.verbose) console.log(`Installing aspnet assets from ${__dirname}/../dist/aspnet/ to ${destPath}`);

  await src(`${__dirname}/../dist/aspnet/**/*.*`)
    .pipe(replace('{{site.title}}', config.name))
    .pipe(dest(destPath));
}

module.exports.installTheme = installTheme;
module.exports.installESLintConfig = installESLintConfig;
module.exports.installAspnetAssets = installAspnetAssets;
