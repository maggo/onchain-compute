export const BlockDataHelperABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "randomNumber",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBlockData",
    inputs: [
      {
        name: "randomNumber",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "blockData",
        type: "tuple",
        internalType: "struct BlockDataHelper.BlockData",
        components: [
          {
            name: "number",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "prevrandao",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "randomNumber",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
] as const;

export const BlockDataHelperBytecode: `0x${string}` =
  "0x608060405234801561001057600080fd5b506040516101ae3803806101ae83398181016040528101906100329190610101565b60006100438261006e60201b60201c565b6040516020016100539190610192565b60405160208183030381529060405290506020810180590381f35b61007661009e565b6040518060800160405280438152602001428152602001448152602001838152509050919050565b6040518060800160405280600081526020016000815260200160008152602001600081525090565b600080fd5b6000819050919050565b6100de816100cb565b81146100e957600080fd5b50565b6000815190506100fb816100d5565b92915050565b600060208284031215610117576101166100c6565b5b6000610125848285016100ec565b91505092915050565b610137816100cb565b82525050565b608082016000820151610153600085018261012e565b506020820151610166602085018261012e565b506040820151610179604085018261012e565b50606082015161018c606085018261012e565b50505050565b60006080820190506101a7600083018461013d565b9291505056fe";
