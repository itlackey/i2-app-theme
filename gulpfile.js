const {
  parallel, series, src, dest,
} = require('gulp');
const del = require('del');
const replace = require('gulp-replace');

function clean() {
  return del(['dist/**/*']);
}

function copyThemeAssets() {
  return src('node_modules/material-dashboard/assets/**/*.*')
    .pipe(dest('dist/assets'));
}

function copyThemeExamplePages() {
  return src('node_modules/material-dashboard/examples/**/*.*')
    .pipe(replace('"../assets/', '"/assets/'))
    .pipe(dest('dist/examples'));
}

function copyDefaultPage() {
  return src('src/index.html')
    .pipe(replace('"../assets/', '"/assets/'))
    .pipe(dest('dist/'));
}

function build() {
  return copyThemeAssets();
}


exports.install = parallel(copyThemeAssets, copyDefaultPage);
exports.examples = copyThemeExamplePages;
exports.build = series(copyThemeAssets, copyDefaultPage);
exports.default = series(clean, build);
