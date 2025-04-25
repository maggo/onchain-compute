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
  .filter((contractPath) => contractPath.endsWith('.sol'))
  .map((contractPath) => path.basename(contractPath, '.sol'));

async function transformFragments() {
  try {
    // Load prettier config
    const options = await prettier.resolveConfig('.');

    // Transform JSON files into TS files
    for (const contractName of helperContractNames) {
      const content = fs.readFileSync(
        path.join(OUT_DIR, `${contractName}.sol`, `${contractName}.json`)
      );

      const json = JSON.parse(content);

      const abi = json.abi;
      const bytecode = json.bytecode.object;

      const fileName = `${contractName}.ts`;

      const fileContent = await prettier.format(
        `
export const ${contractName}ABI = ${JSON.stringify(abi, null, 2)} as const;

export const ${contractName}Bytecode: \`0x\${string}\` = '${bytecode}';
  `,
        { parser: 'typescript', ...options }
      );

      fs.writeFileSync(path.join(FRAGMENTS_DIR, fileName), fileContent);
    }

    console.log(
      `Generated fragments for helper contracts: \n\n${helperContractNames.join(
        '\n'
      )}`
    );
  } catch (error) {
    console.error('Error transforming fragments:', error);
    process.exit(1);
  }
}

transformFragments();
