const { src, dest } = require("gulp");
const path = require("path");

module.exports.installTheme = async function installTheme(target, verbose) {
    const destPath = path.join(process.cwd(), target);

    if (verbose) console.log(`Installing to ${destPath}`);

    await src(__dirname + "/dist/**/*.*").pipe(dest(destPath));
}

module.exports.installESLintConfig = async function installESLintConfig(target, verbose) {
    const destPath = path.join(process.cwd(), target);

    if (verbose) console.log(`Installing ESLint config to ${destPath}`);

    await src(__dirname + "/dist/.eslintrc.js").pipe(dest(destPath));
}