import { createPublicClient, http } from 'viem';
import { base, mainnet } from 'viem/chains';
import {
  BlockDataHelperABI,
  BlockDataHelperBytecode,
} from '../fragments/BlockDataHelper';
import {
  ENSReverseRecordsABI,
  ENSReverseRecordsBytecode,
} from '../fragments/ENSReverseRecords';
import { executeHelper } from './lib/executeHelper';

const baseClient = createPublicClient({
  chain: base,
  transport: http(),
});

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

async function main() {
  {
    // Block data example
    console.log('Fetching latest block data…');

    const blockData = await executeHelper({
      abi: BlockDataHelperABI,
      bytecode: BlockDataHelperBytecode,
      args: [BigInt(Math.floor(Math.random() * 1337))],
      client: baseClient,
      functionName: 'getBlockData',
    });

    // The resulting `blockData` is correctly typed based on the ABI
    // generated and exported in `fragments/BlockDataHelper.ts`

    console.log(blockData);
  }

  console.log('--------------------------------');

  {
    // ENS resolver example
    console.log('Resolving ENS names…');

    const ensData = await executeHelper({
      abi: ENSReverseRecordsABI,
      bytecode: ENSReverseRecordsBytecode,
      args: [
        '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // ENS registry address
        [
          // addresses to get ENS names for
          '0x6860f1A0cF179eD93ABd3739c7f6c8961A4EEa3c',
          '0xfffff449f1a35eb0facca8d4659d8e15cf2f77ba',
          '0xfd37f4625ca5816157d55a5b3f7dd8dd5f8a0c2f',
        ],
      ],
      client: mainnetClient,
      functionName: 'getNames',
    });

    // The resulting `ensData` is correctly typed based on the ABI
    // generated and exported in `fragments/ENSReverseRecords.ts`

    console.log(ensData);
  }
}

main();
