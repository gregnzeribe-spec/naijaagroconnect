const fs = require('node:fs');
const path = require('node:path');

const binaries = [
  path.join('node_modules', '@esbuild', 'linux-x64', 'bin', 'esbuild'),
  path.join('node_modules', 'esbuild', 'bin', 'esbuild')
];

for (const relativePath of binaries) {
  const filePath = path.resolve(relativePath);
  if (!fs.existsSync(filePath)) continue;
  try {
    fs.chmodSync(filePath, 0o755);
    console.log(`Executable permission set: ${relativePath}`);
  } catch (error) {
    console.warn(`Could not set executable permission for ${relativePath}: ${error.message}`);
  }
}
