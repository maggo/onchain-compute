// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract BlockDataHelper {
    struct BlockData {
        uint256 number;
        uint256 timestamp;
        uint256 prevrandao;
        uint256 randomNumber;
    }

    constructor(uint256 randomNumber) {
        bytes memory _abiEncodedData = abi.encode(getBlockData(randomNumber));

        assembly {
            let dataStart := add(_abiEncodedData, 0x20)
            return(dataStart, sub(msize(), dataStart))
        }
    }

    function getBlockData(
        uint256 randomNumber
    ) public view returns (BlockData memory blockData) {
        blockData = BlockData(
            block.number,
            block.timestamp,
            block.prevrandao,
            randomNumber
        );
    }
}
