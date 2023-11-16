// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransactionContract {
    struct Transaction {
        uint256 transactionId;
        uint256 transactionDate;
        uint256 amount;
        string userName;
        string message;
        address sender;
        address receiver;
    }

    uint256 public transactionCount;

    mapping(address => Transaction[]) public incomingTransactions;
    mapping(address => Transaction[]) public outgoingTransactions;

    event TransactionAdded(
        uint256 transactionId,
        uint256 transactionDate,
        uint256 amount,
        string userName,
        string message,
        address sender,
        address receiver,
        bool isIncome
    );

    constructor() {
        transactionCount = 0;
    }

    function addTransactionAndSendEther(
        address payable _receiver,
        string memory _userName,
        string memory _message,
        uint256 _amount
    ) external payable {
        require(_amount > 0, "Ether amount must be greater than 0");
        require(msg.value <= address(this).balance, "Insufficient Ether sent");

        uint256 transactionDate = block.timestamp;

        Transaction memory newTransaction = Transaction({
            transactionId: transactionCount,
            transactionDate: transactionDate,
            amount: msg.value,
            userName: _userName,
            message: _message,
            sender: msg.sender,
            receiver: _receiver
        });

        incomingTransactions[_receiver].push(newTransaction);
        outgoingTransactions[msg.sender].push(newTransaction);

        (bool sent, ) = _receiver.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit TransactionAdded(
            transactionCount,
            transactionDate,
            _amount,
            _userName,
            _message,
            msg.sender,
            _receiver,
            false
        );

        transactionCount++;
    }

    function getIncomingTransactionHistory(
        address _userAddress
    ) external view returns (Transaction[] memory) {
        return incomingTransactions[_userAddress];
    }

    function getOutgoingTransactionHistory(
        address _userAddress
    ) external view returns (Transaction[] memory) {
        return outgoingTransactions[_userAddress];
    }
}
