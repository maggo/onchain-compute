export const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'randomNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'randomNumber',
        type: 'uint256',
      },
    ],
    name: 'getBlockData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'prevrandao',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'randomNumber',
            type: 'uint256',
          },
        ],
        internalType: 'struct BlockDataHelper.BlockData',
        name: 'blockData',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const bytecode: `0x${string}` =
  '0x608060405234801561001057600080fd5b5060405161013e38038061013e83398101604081905261002f916100c3565b600061003a82610065565b60405160200161004a919061012f565b60405160208183030381529060405290506020810180590381f35b6100906040518060800160405280600081526020016000815260200160008152602001600081525090565b604051608081016040908152438252426020830152449082015260608101929092525090565b6000815190505b92915050565b6000602082840312156100d8576100d8600080fd5b60006100e484846100b6565b949350505050565b6080820181518352602082015161010560208501829052565b50604082015161011760408501829052565b50606082015161012960608501829052565b50505050565b608081016100bd82846100ec56fe';
