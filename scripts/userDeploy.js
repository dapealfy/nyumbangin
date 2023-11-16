const hre = require('hardhat');

async function main() {
  const user = await hre.ethers.getContractFactory('UserContract');
  const userContract = await user.deploy();

  await userContract.deployed();
  console.log('User Contract deployed to:', userContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
