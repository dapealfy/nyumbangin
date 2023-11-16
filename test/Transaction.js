// Import necessary modules
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TransactionContract', () => {
  let transactionContract;
  let user1, user2;

  before(async () => {
    [user1, user2] = await ethers.getSigners();

    const TransactionContractFactory = await ethers.getContractFactory('TransactionContract');
    transactionContract = await TransactionContractFactory.deploy();
    await transactionContract.deployed();
  });

  it('should add a transaction and retrieve incoming/outgoing transactions', async () => {
    const amount = ethers.utils.parseEther('1.0');
    const userName = 'Alice';
    const message = 'Payment for services';

    const initialIncomingTxCount = (await transactionContract.getIncomingTransactionHistory(user2.address)).length;
    const initialOutgoingTxCount = (await transactionContract.getOutgoingTransactionHistory(user1.address)).length;

    await transactionContract.addTransactionAndSendEther(user2.address, userName, message, amount, {value: amount});

    const updatedIncomingTxCount = (await transactionContract.getIncomingTransactionHistory(user2.address)).length;
    const updatedOutgoingTxCount = (await transactionContract.getOutgoingTransactionHistory(user1.address)).length;

    expect(updatedIncomingTxCount).to.equal(initialIncomingTxCount + 1);
    expect(updatedOutgoingTxCount).to.equal(initialOutgoingTxCount + 1);

    const incomingTransactions = await transactionContract.getIncomingTransactionHistory(user2.address);
    const outgoingTransactions = await transactionContract.getOutgoingTransactionHistory(user1.address);

    expect(incomingTransactions[updatedIncomingTxCount - 1].amount).to.equal(amount);
    expect(incomingTransactions[updatedIncomingTxCount - 1].userName).to.equal(userName);
    expect(incomingTransactions[updatedIncomingTxCount - 1].message).to.equal(message);
    expect(incomingTransactions[updatedIncomingTxCount - 1].receiver).to.equal(user2.address);

    expect(outgoingTransactions[updatedOutgoingTxCount - 1].amount).to.equal(amount);
    expect(outgoingTransactions[updatedOutgoingTxCount - 1].userName).to.equal(userName);
    expect(outgoingTransactions[updatedOutgoingTxCount - 1].message).to.equal(message);
    expect(outgoingTransactions[updatedOutgoingTxCount - 1].sender).to.equal(user1.address);

  });
});
