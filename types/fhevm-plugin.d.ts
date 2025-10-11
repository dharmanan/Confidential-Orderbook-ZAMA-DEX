// Minimal type augmentation for hre.fhevm so TS doesn't complain.
// You can delete/adjust this if your installed plugin version ships full typings.

import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    fhevm: {
      initializeCLIApi: () => Promise<void>;
      encrypt: (params: { value: number, publicKey: string, signature: string, type: string }) => Promise<{ euint: string }>;
      getPublicKey: (userAddress: string) => Promise<string>;
      sign: (userAddress: string) => Promise<string>;
      createEncryptedInput: (contractAddress: string, userAddress: string) => Promise<RelayerEncryptedInput>;
    };
  }
  export interface RelayerEncryptedInput {
    add32: (value: number) => void;
    encrypt: () => Promise<void>;
    toBytes32Array: () => [string, string];
  }
}
