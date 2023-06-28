const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const FRAGMENTS_DIR = './fragments';
const OUT_DIR = './out';
const CONTRACTS_DIR = './src';

// Create fragments directory if it doesn't exist
if (!fs.existsSync(FRAGMENTS_DIR)) {
  fs.mkdirSync(FRAGMENTS_DIR);
}

// Get all helper contract names
const helperContractNames = fs
  .readdirSync(CONTRACTS_DIR)
  .map((contractPath) => path.basename(contractPath, '.sol'));

// Load prettier config
prettier
  .resolveConfig('.')
  .then((options) => {
    // Transform JSON files into TS files
    helperContractNames.forEach((contractName) => {
      const content = fs.readFileSync(
        path.join(OUT_DIR, `${contractName}.sol`, `${contractName}.json`)
      );

      const json = JSON.parse(content);

      const abi = json.abi;
      const bytecode = json.bytecode.object;

      const fileName = `${contractName}.ts`;

      const fileContent = prettier.format(
        `
export const abi = ${JSON.stringify(abi, null, 2)} as const;

export const bytecode: \`0x\${string}\` = '${bytecode}';
  `,
        { parser: 'typescript', ...options }
      );

      fs.writeFileSync(path.join(FRAGMENTS_DIR, fileName), fileContent);
    });
  })
  .then(() => {
    console.log(
      `Generated fragments for helper contracts: \n\n${helperContractNames.join(
        '\n'
      )}`
    );
  });
