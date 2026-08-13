const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const k6Args = ['run', '--console-output=debug_requests.txt', ...args];

console.log('Starting k6 with debug logging enabled...\n');

const result = spawnSync('k6', k6Args, {
    stdio: 'inherit',
    shell: true,
    env: {
        ...process.env,
        DEBUG: 'true'
    }
});

process.exit(result.status !== null ? result.status : 1);
