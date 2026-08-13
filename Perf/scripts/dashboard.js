const { spawnSync, execSync } = require('child_process');
const fs = require('fs');

const args = process.argv.slice(2);
const k6Args = ['run', ...args];

console.log('Starting k6 with Web Dashboard enabled...\n');

const result = spawnSync('k6', k6Args, {
    stdio: 'inherit',
    shell: true,
    env: {
        ...process.env,
        K6_WEB_DASHBOARD: 'true',
        K6_WEB_DASHBOARD_EXPORT: 'html-report.html'
    }
});

// Check if the report was actually generated (k6 skips if test is too short)
if (fs.existsSync('html-report.html')) {
    console.log('\n📊 Opening html-report.html in your default browser...');
    try {

        execSync('start "" "html-report.html"');
    } catch (err) {
        console.error('Failed to open browser:', err.message);
    }
} else {
    console.log('No html-report.html was found to open.');
}

process.exit(result.status !== null ? result.status : 1);
