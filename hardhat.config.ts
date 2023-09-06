import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    Mainnet: {
      url:"https://filfox.info/rpc/v1",
      chainId: 314,
      accounts: [process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY],
    },
    calibration: {
      url:"https://calibration.filfox.info/rpc/v1",
      chainId: 314159,
      accounts: [process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY],
    },
  },
};

export default config;
