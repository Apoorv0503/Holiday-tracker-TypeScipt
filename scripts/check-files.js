const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '../src/components');
const appFilePath = path.join(__dirname, '../src/App.tsx');
const typesFilePath = path.join(__dirname, '../src/types/Holiday.ts');

(async () => {
  const { default: chalk } = await import('chalk');

  const logSuccess = (message) => {
    console.log(chalk.green.bold('✔ ' + message));
  };

  const logError = (message) => {
    console.error(chalk.red.bold('✖ ' + message));
  };

  // Check for .tsx extension in components
  fs.readdirSync(componentsPath).forEach(file => {
    const ext = path.extname(file);
    if (ext && ext !== '.tsx' && ext !== '.css') {
      logError(`File ${file} has an unsupported extension: ${ext}`);
    } else if (ext === '.tsx') {
      logSuccess(`File ${file} is correctly using the .tsx extension`);
    }
  });

  // Check for App.tsx file
  if (!fs.existsSync(appFilePath) || path.extname(appFilePath) !== '.tsx') {
    logError('App.tsx file is missing or incorrect extension');
  } else {
    logSuccess('App.tsx file is present and correctly uses the .tsx extension');
  }

  // Check for type definitions in Holiday.ts
  const typesFileContent = fs.readFileSync(typesFilePath, 'utf8');
  if (!typesFileContent.includes('export interface Holiday')) {
    logError('Type definitions are missing in Holiday.ts');
  } else {
    logSuccess('Type definitions are present in Holiday.ts');
  }
})();
