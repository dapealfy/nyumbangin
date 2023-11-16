const hre = require('hardhat');

async function main() {
  const transaction = await hre.ethers.getContractFactory('TransactionContract');
  const transactionContract = await transaction.deploy();

  await transactionContract.deployed();
  console.log('Transaction Contract deployed to:', transactionContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
