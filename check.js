const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'build') continue;
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = walk(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const rootDir = process.cwd();
const files = walk(rootDir);

// 1. Find duplicates by name (case-insensitive)
console.log("=== Checking for file name casing duplicates ===");
const nameMap = new Map();
files.forEach(f => {
  const lower = f.toLowerCase();
  if (nameMap.has(lower) && nameMap.get(lower) !== f) {
    console.log(`DUPLICATE FOUND:\n  1) ${nameMap.get(lower)}\n  2) ${f}`);
  } else {
    nameMap.set(lower, f);
  }
});

// 2. Find case-sensitive import issues
console.log("\n=== Checking for case-sensitive import errors ===");
const jsFiles = files.filter(f => /\.(js|jsx|ts|tsx)$/.test(f));
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // simplistic import extraction
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const dirName = path.dirname(file);
      let resolvedBase = path.resolve(dirName, importPath);
      
      // possible file extensions
      const possibleExtensions = ['', '.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx'];
      let foundExact = false;
      let foundCaseInsensitive = false;
      let actualPath = null;
      
      for (const ext of possibleExtensions) {
         let testPath = resolvedBase + ext;
         if (files.includes(testPath)) {
            foundExact = true;
            break;
         }
         
         // test case insensitive
         const matchFile = files.find(f => f.toLowerCase() === testPath.toLowerCase());
         if (matchFile) {
             foundCaseInsensitive = true;
             actualPath = matchFile;
         }
      }
      
      if (!foundExact && foundCaseInsensitive) {
         console.log(`CASE ERROR in ${file}`);
         console.log(`  Imported as: '${importPath}'`);
         console.log(`  Actual file: '${path.relative(dirName, actualPath).replace(/\\/g, '/')}'`);
      }
    }
  }
});

// Also check duplicates of the same content or same name in different folders?
console.log("\n=== Checking for exact name matches across different folders ===");
const baseNameMap = new Map();
files.forEach(f => {
  const base = path.basename(f);
  if (!baseNameMap.has(base)) baseNameMap.set(base, []);
  baseNameMap.get(base).push(f);
});

for (const [base, paths] of baseNameMap.entries()) {
  const ignoreList = ['index.js', 'index.html', 'package.json', 'README.md', 'App.js', 'server.js'];
  if (ignoreList.includes(base) || base.endsWith('.css') || base.endsWith('.env')) continue;
  if (paths.length > 1) {
      console.log(`Multiple files named '${base}':`);
      paths.forEach(p => console.log(`  - ${p}`));
  }
}

console.log("\n=== Check complete ===");
