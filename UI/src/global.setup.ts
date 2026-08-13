import fs from 'fs';
import path from 'path';

async function globalSetup() {
  const authDir = path.resolve('.auth');
  if (fs.existsSync(authDir)) {
    fs.rmSync(authDir, { recursive: true, force: true });
  }
  fs.mkdirSync(authDir, { recursive: true });
}

export default globalSetup;
