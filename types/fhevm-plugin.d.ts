// Minimal type augmentation for hre.fhevm so TS doesn't complain.
// You can delete/adjust this if your installed plugin version ships full typings.

import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    fhevm: {
      initializeCLIApi: () => Promise<void>;
      // Diğer FHEVM fonksiyonlarını burada ekleyebilirsiniz
        encryptUint: (fhevmType: number, value: number, contractAddress: string, userAddress: string) => Promise<{ externalEuint: string, inputProof: string }>;
    };
  }
}
