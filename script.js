const balance = document.getElementById('balance');
    const pluse = document.getElementById('pluse');
    const minus = document.getElementById("minus");
    const TransactionName = document.getElementById("transaction-name");
    const TransactionMethod = document.getElementById("transaction-method");
    const TransactionAmount = document.getElementById("transaction-amount");
    const addTransaction = document.getElementById("add");
    const transactionList = document.getElementById("transaction-list");

    let totalAmount = 0;
    let incomeAmount = 0;
    let expenseAmount = 0;

    function updateBalance() {
        balance.textContent = `₹${totalAmount.toFixed(2)}`;
        pluse.textContent = `+ ₹${incomeAmount.toFixed(2)}`;
        minus.textContent = `- ₹${expenseAmount.toFixed(2)}`;
    }

    const dummyTransaction = [
        { id: 1, text: "Flower", amount: -20 },
        { id: 2, text: "Book", amount: 20 },
       
    ]
    let transaction=dummyTransaction

    addTransaction.addEventListener('click', () => {
            const transactionName = TransactionName.value.trim();
            const transactionAmount = parseFloat(TransactionAmount.value.trim());

            if (transactionName === "" || isNaN(transactionAmount)) {
                alert("Please enter a valid transaction name and amount");
                return;
            }

            const item = document.createElement("li");
            item.classList.add(transactionAmount < 0 ? "minus" : "pluse");
            item.innerHTML = `${transactionName}:&nbsp;&nbsp;₹${transactionAmount.toFixed(2)}`;
            transactionList.appendChild(item);

            // // Update totals
            // totalAmount += transactionAmount;
            // if (transactionAmount > 0) {
            //     incomeAmount += transactionAmount;
            // } else {
            //     expenseAmount += Math.abs(transactionAmount);
            // }

            totalAmount+=transactionAmount;
            if(transactionAmount>0){
                incomeAmount+=transactionAmount;
            }
            else{
                expenseAmount+=Math.abs(transactionAmount)
            }

            // // Update balance and totals
             updateBalance();

            // // Clear input fields
            TransactionName.value = "";
            TransactionAmount.value = "";
        });