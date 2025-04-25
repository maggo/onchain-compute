// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19;

import {ENS} from '@ensdomains/ens-contracts/contracts/registry/ENS.sol';
import {ReverseRegistrar} from '@ensdomains/ens-contracts/contracts/reverseRegistrar/ReverseRegistrar.sol';
import {Resolver} from '@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol';
import {NameEncoder} from '@ensdomains/ens-contracts/contracts/utils/NameEncoder.sol';

abstract contract NameResolver {
    function setName(bytes32 node, string memory name) public virtual;
}

/**
 * Based on https://etherscan.io/address/0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C#code
 * The contract is deployed on Mainnet @ 0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C
 * This is just an example of how to do the same computation in a read call!
 */
contract ENSReverseRecords {
    ENS private ens;
    ReverseRegistrar private registrar;
    bytes32 private constant ADDR_REVERSE_NODE =
        0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2;

    /**
     * The `constructor` takes ENS registry address
     */
    constructor(ENS _ens, address[] memory addresses) {
        ens = _ens;
        registrar = ReverseRegistrar(ens.owner(ADDR_REVERSE_NODE));

        bytes memory _abiEncodedData = abi.encode(getNames(addresses));

        assembly {
            let dataStart := add(_abiEncodedData, 0x20)
            return(dataStart, sub(msize(), dataStart))
        }
    }

    /**
     * Read only function to return ens name only if both forward and reverse resolution are set     *
     */
    function getNames(
        address[] memory addresses
    ) public view returns (string[] memory r) {
        r = new string[](addresses.length);
        for (uint8 i = 0; i < addresses.length; i++) {
            bytes32 thisNode = node(addresses[i]);
            address resolverAddress = ens.resolver(thisNode);
            if (resolverAddress != address(0x0)) {
                Resolver resolver = Resolver(resolverAddress);
                string memory name = resolver.name(thisNode);
                if (bytes(name).length == 0) {
                    continue;
                }
                (, bytes32 namehash) = NameEncoder.dnsEncodeName(name);
                address forwardResolverAddress = ens.resolver(namehash);
                if (forwardResolverAddress != address(0x0)) {
                    Resolver forwardResolver = Resolver(forwardResolverAddress);
                    address forwardAddress = forwardResolver.addr(namehash);
                    if (forwardAddress == addresses[i]) {
                        r[i] = name;
                    }
                }
            }
        }
        return r;
    }

    function node(address addr) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(ADDR_REVERSE_NODE, sha3HexAddress(addr))
            );
    }

    function sha3HexAddress(address addr) private pure returns (bytes32 ret) {
        addr;
        ret; // Stop warning us about unused variables
        assembly {
            let
                lookup
            := 0x3031323334353637383961626364656600000000000000000000000000000000

            for {
                let i := 40
            } gt(i, 0) {

            } {
                i := sub(i, 1)
                mstore8(i, byte(and(addr, 0xf), lookup))
                addr := div(addr, 0x10)
                i := sub(i, 1)
                mstore8(i, byte(and(addr, 0xf), lookup))
                addr := div(addr, 0x10)
            }

            ret := keccak256(0, 40)
        }
    }
}
