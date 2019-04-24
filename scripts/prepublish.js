const inquirer = require('inquirer');
const genaratePackage = require('./genaratePackage.js');
const fs = require('fs');
const path = require('path');
const utils = require('util');

const writeFile = utils.promisify(fs.writeFile);
const readFile = utils.promisify(fs.readFile);
(async () => {
  const { version } = await inquirer.prompt([
    {
      type: 'input',
      name: 'version'
    }
  ]);

  const pkg = genaratePackage(version);
  await writeFile(path.resolve(__dirname, '../lib/package.json'), pkg);
  const rdm = await readFile(path.resolve(__dirname, '../README.md'));
  await writeFile(path.resolve(__dirname, '../lib/README.md'), rdm);
})();
