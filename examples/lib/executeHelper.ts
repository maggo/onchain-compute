import type {
  Abi,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  Narrow,
} from 'abitype';
import { PublicClient, decodeFunctionResult, encodeDeployData } from 'viem';

export type ExecuteHelperProps<
  TAbi extends Abi,
  TArgs extends AbiParametersToPrimitiveTypes<
    Extract<TAbi[number], { type: 'constructor' }>['inputs']
  >,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>
> = {
  abi: Narrow<TAbi>;
  bytecode: `0x${string}`;
  args: TArgs;
  client: PublicClient;
  /** The contract function which return type is being used to decode the data */
  functionName: TFunctionName;
};

export type ExecuteHelperReturnType<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>
> = AbiParameterToPrimitiveType<
  ExtractAbiFunction<TAbi, TFunctionName>['outputs'][0]
>;

export async function executeHelper<
  TAbi extends Abi,
  TArgs extends AbiParametersToPrimitiveTypes<
    Extract<TAbi[number], { type: 'constructor' }>['inputs']
  >,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>
>({
  abi,
  bytecode,
  args,
  functionName,
  client,
}: ExecuteHelperProps<TAbi, TArgs, TFunctionName>): Promise<
  ExecuteHelperReturnType<TAbi, TFunctionName>
> {
  const deployData = encodeDeployData<Abi>({
    abi,
    bytecode,
    args: args as readonly unknown[],
  });

  const { data } = await client.call({
    data: deployData,
  });

  if (!data) {
    throw new Error('HELPER_CALL_FAILED');
  }

  return decodeFunctionResult<Abi, string>({
    abi,
    functionName,
    data,
  }) as ExecuteHelperReturnType<TAbi, TFunctionName>;
}
