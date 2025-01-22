// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)
    createAccount(name, initialDeposit = 0){
        const account = new Account(name, initialDeposit);
        this.accounts.push(account);
        return account;
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
        this.recordTransaction('Account Created', balance);
    }

// Record a transaction
recordTransaction(type, amount, relatedAccount = null){
    const transaction = {
        transactionType: type,
        amount,
        relatedAccount,
        date: new Date().toLocaleString()
    };
    this.transactionHistory.push(transaction);
}

// Deppsit money into the account
deposit(amount){
    if (amount <= 0) {
        console.log('Deposit amount must be greater than zero.');
        return;
    }
    this.balance += amount;
    this.recordTransaction('Deposit', amount);
    console.log(`Deposited $${amount}. New balance: $${this.balance} `);
}

// Withdraw money from the account
withdraw(amount) {
    if (amount <=0){
        console.log('Withdrawal amount must be greater than zero.');
        return;
    }
    if (amount > this.balance){
        console.log('Insufficient balance for withdrawal.');
        return;
    }
    this.balance -= amount;
    this.recordTransaction('Withdrawal', amount);
    console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
}
    
// Transfer money to another account:
transfer(amount, recipientAccount) {
    if (amount <= 0) {
        console.log ('Transfer amount must be greater than zero.');
        return;
    }
    if (amount > this.balance) {
        console.log('Insufficient balance for transfer.');
        return;
    }
    this.balance -= amount;
    recipientAccount.balance += amount;

    //Record the transaction for both acounts
    this.recordTransaction('Transfer', amount, recipientAccount.name);
    recipientAccount.recordTransaction('Received', amount, this.name);
    console.log(`Transferred $${amount} to ${recipientAccount.name}. Your new balance: $${this.balance}`);
}

// Check the account balance
checkBalance() {
    console.log(`${this.name}'s balance: $${this.balance}`);
    return this.balance;
    }


    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
    
    // Example: checkBalance()
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
