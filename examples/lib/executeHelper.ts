import type {
  Abi,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  Narrow,
} from 'abitype';
import {
  type Chain,
  type PublicClient,
  type Transport,
  decodeFunctionResult,
  encodeDeployData,
} from 'viem';

export type ExecuteHelperProps<
  TAbi extends Abi,
  TArgs extends AbiParametersToPrimitiveTypes<
    Extract<TAbi[number], { type: 'constructor' }>['inputs']
  >,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
  TTransport extends Transport,
  TChain extends Chain,
> = {
  abi: Narrow<TAbi>;
  bytecode: `0x${string}`;
  args: TArgs;
  client: PublicClient<TTransport, TChain>;
  /** The contract function which return type is being used to decode the data */
  functionName: TFunctionName;
};

export type ExecuteHelperReturnType<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = AbiParameterToPrimitiveType<
  ExtractAbiFunction<TAbi, TFunctionName>['outputs'][0]
>;

export async function executeHelper<
  TAbi extends Abi,
  TArgs extends AbiParametersToPrimitiveTypes<
    Extract<TAbi[number], { type: 'constructor' }>['inputs']
  >,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
  TTransport extends Transport,
  TChain extends Chain,
>({
  abi,
  bytecode,
  args,
  functionName,
  client,
}: ExecuteHelperProps<TAbi, TArgs, TFunctionName, TTransport, TChain>): Promise<
  ExecuteHelperReturnType<TAbi, TFunctionName>
> {
  const deployData = encodeDeployData<Abi>({
    abi,
    bytecode,
    args: args as readonly unknown[],
  });

  const { data } = await client.call({
    data: deployData,
  } as any);

  if (!data) {
    throw new Error('HELPER_CALL_FAILED');
  }

  return decodeFunctionResult<Abi, string>({
    abi,
    functionName,
    data,
  }) as ExecuteHelperReturnType<TAbi, TFunctionName>;
}
