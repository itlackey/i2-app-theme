const {
  parallel, series, src, dest, watch,
} = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const liveServer = require('live-server');

function clean() {
  return del(['dist/**/*']);
}

async function copyThemeAssets() {
  await src('node_modules/material-dashboard/assets/css/**/*.*').pipe(
    dest('dist/assets/css'),
  );
  await src('node_modules/material-dashboard/assets/js/**/*.*').pipe(
    dest('dist/assets/js'),
  );
  // await src("node_modules/material-dashboard/assets/img/apple-icon.png").pipe(
  //   dest("dist/assets/img")
  // );
  await src('node_modules/material-dashboard/assets/scss/**/*.*').pipe(
    dest('dist/assets/scss'),
  );

  // return del(["dist/img/favicon.png"]);
}
function copyAspnetAssets() {
  return src('src/aspnet/**/*.*')
    .pipe(dest('dist/aspnet'));
}


function copyThemeExamplePages() {
  return src('node_modules/material-dashboard/examples/**/*.*')
    .pipe(replace('"../assets/', '"/assets/'))
    .pipe(dest('dist/examples'));
}

async function copyDefaultPage() {
  await src('src/*.png').pipe(dest('dist/assets/img'));

  return src('src/index.html')
    .pipe(replace('"../assets/', '"/assets/'))
    .pipe(dest('dist/'));
}

function copyESLintConfig() {
  return src('src/.eslintrc.js').pipe(dest('dist'));
}


function runDev() {
  const params = {
    port: 5001, // Set the server port. Defaults to 8080.
    host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: 'dist', // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
  };
  liveServer.start(params);
  watch('src/index.html', copyDefaultPage);
}

exports.examples = copyThemeExamplePages;
exports.build = parallel(copyThemeAssets,
  copyDefaultPage, copyESLintConfig, copyThemeExamplePages, copyAspnetAssets);
exports.dev = runDev;
exports.default = series(clean, this.build);
