import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { abi, bytecode } from '../fragments/BlockDataHelper';
import { executeHelper } from './lib/executeHelper';

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

async function main() {
  const data = await executeHelper({
    abi,
    bytecode,
    args: [1337n],
    client,
    functionName: 'getBlockData',
  });

  console.log(data);
}

main();
