const balance = document.getElementById('balance');
const pluse = document.getElementById('pluse');
const minus = document.getElementById("minus");
const TransactionName = document.getElementById("transaction-name");
const TransactionAmount = document.getElementById("transaction-amount");
const addTransaction = document.getElementById("add");
const transactionList = document.getElementById("transaction-list");

let totalAmount = 0;
let incomeAmount = 0;
let expenseAmount = 0;

// Retrieve transactions from localStorage or initialize with an empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update the balance, income, and expense
function updateBalance() {
    balance.textContent = `₹${totalAmount.toFixed(2)}`;
    pluse.textContent = `+ ₹${incomeAmount.toFixed(2)}`;
    minus.textContent = `- ₹${expenseAmount.toFixed(2)}`;
}

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add a transaction to the DOM
function addTransactionDOM(transactionItem) {
    const item = document.createElement("li");
    item.classList.add(transactionItem.amount < 0 ? "minus" : "pluse");
    item.innerHTML = `${transactionItem.text}:&nbsp;&nbsp;₹${transactionItem.amount.toFixed(2)}`;
    transactionList.appendChild(item);

    totalAmount += transactionItem.amount;
    if (transactionItem.amount > 0) {
        incomeAmount += transactionItem.amount;
    } else {
        expenseAmount += Math.abs(transactionItem.amount);
    }
}

// Initialize the app with transactions stored in localStorage
function init() {
    transactionList.innerHTML = ""; // Clear the list
    totalAmount = 0;
    incomeAmount = 0;
    expenseAmount = 0;

    transactions.forEach(addTransactionDOM); // Add stored transactions to the DOM
    updateBalance();
}

// Event listener for adding a new transaction
addTransaction.addEventListener('click', (e) => {
    e.preventDefault();

    const transactionName = TransactionName.value.trim();
    const transactionAmount = parseFloat(TransactionAmount.value.trim());

    if (transactionName === "" || isNaN(transactionAmount)) {
        alert("Please enter a valid transaction name and amount");
        return;
    }

    const newTransaction = {
        id: transactions.length + 1,
        text: transactionName,
        amount: transactionAmount
    };

    transactions.push(newTransaction);
    addTransactionDOM(newTransaction);

    // Update balance, totals, and save to localStorage
    updateBalance();
    saveTransactions();

    // Clear input fields
    TransactionName.value = "";
    TransactionAmount.value = "";
});

// Load stored transactions on page load
document.addEventListener('DOMContentLoaded', init);
