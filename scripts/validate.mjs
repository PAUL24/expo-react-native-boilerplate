import { spawnSync } from 'node:child_process';
import process from 'node:process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const checks = [
  ['run', 'format:check'],
  ['run', 'lint'],
  ['run', 'typecheck'],
  ['test', '--', '--runInBand'],
  ['run', 'doctor'],
];

for (const args of checks) {
  const result = spawnSync(npmCommand, args, { stdio: 'inherit' });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
