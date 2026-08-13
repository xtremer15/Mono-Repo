const esbuild = require('esbuild');
const glob = require('glob');
const path = require('path');

// Find all test files
const testFiles = glob.sync('./src/e2e/**/*.spec.ts');

if (testFiles.length === 0) {
    console.warn("No test files found.");
    process.exit(0);
}

// Convert the array into an entryPoints object { 'homepage.spec': './src/e2e/homepage.spec.ts' }
const entryPoints = testFiles.reduce((acc, file) => {
    const name = path.basename(file, '.ts');
    acc[name] = file;
    return acc;
}, {});

console.log("Building k6 bundles with esbuild...");
const startTime = Date.now();

esbuild.build({
    entryPoints,
    outdir: 'dist',
    outExtension: { '.js': '.bundle.js' },
    bundle: true,
    format: 'esm',
    target: 'es2020',
    platform: 'node',
    external: ['k6', 'https://*'],
    minify: false,
}).then(() => {
    console.log(`Build completed in ${Date.now() - startTime}ms`);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
