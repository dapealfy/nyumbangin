require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = 'd0dcbb6f43cf9c2a9bcd855d33404eb4790212d8cb84c3a1ee8475f2a6115341';

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: './artifacts',
  },
  networks: {
    polygon: {
      url: 'https://polygon-mumbai.infura.io/v3/094520e1a4ff44fd941f9fc23d255aee',
      accounts: [PRIVATE_KEY],
    },
    hardhat: {},
  },
};
