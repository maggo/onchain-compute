# Onchain Compute Helpers

Scripts that execute solidity code in eth_call for on-chain execution on read ✨

Based on work by [libevm](https://www.libevm.com/2023/01/03/abusing-eth-call/) and [drgorilla](https://github.com/drgorillamd/UniV2-burn/blob/master/contracts/BatchRequest.sol)

# Install

```sh
$ pnpm install
```

## Smart contract development

If you want to update the contracts you'll also need to install [foundry](https://book.getfoundry.sh/getting-started/installation) installed

# Build

This builds the contracts as well as the fragments required for viem

```sh
$ pnpm build
```

# Run example scripts

```sh
$ pnpm ts-node examples/index.ts
```
