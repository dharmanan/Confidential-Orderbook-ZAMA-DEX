// Minimal type augmentation for hre.fhevm so TS doesn't complain.
// You can delete/adjust this if your installed plugin version ships full typings.

import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    fhevm?: any;
  }
}
