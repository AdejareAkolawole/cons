// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
}

// Mock exchange rates (in a real app, you'd use an API like ExchangeRate-API)
const exchangeRates = {
    NGN_USD: 0.00061, // 1 NGN = 0.00061 USD
    USD_NGN: 1639.34   // 1 USD = 1639.34 NGN
};

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('conversionResult');

    if (!amount || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount';
        return;
    }

    let convertedAmount;
    if (fromCurrency === 'NGN' && toCurrency === 'USD') {
        convertedAmount = (amount * exchangeRates.NGN_USD).toFixed(2);
        resultElement.textContent = `${amount} NGN = ${convertedAmount} USD`;
    } else if (fromCurrency === 'USD' && toCurrency === 'NGN') {
        convertedAmount = (amount * exchangeRates.USD_NGN).toFixed(2);
        resultElement.textContent = `${amount} USD = ${convertedAmount} NGN`;
    } else {
        resultElement.textContent = 'Select different currencies to convert';
    }
}

// Savings Goals
function addGoal() {
    const goalName = document.getElementById('goalName').value;
    const goalAmount = document.getElementById('goalAmount').value;
    const goalsList = document.getElementById('goalsList');

    if (!goalName || !goalAmount || goalAmount <= 0) {
        alert('Please enter a valid goal name and amount');
        return;
    }

    const goal = { name: goalName, amount: goalAmount };
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));

    displayGoals();
    document.getElementById('goalName').value = '';
    document.getElementById('goalAmount').value = '';
}

function displayGoals() {
    const goalsList = document.getElementById('goalsList');
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goalsList.innerHTML = '';

    goals.forEach(goal => {
        const div = document.createElement('div');
        div.className = 'goal';
        div.innerHTML = `<span>${goal.name}</span><span>NGN ${goal.amount}</span>`;
        goalsList.appendChild(div);
    });
}

// Loan Application
function applyLoan() {
    const purpose = document.getElementById('loanPurpose').value;
    const amount = document.getElementById('loanAmount').value;
    const term = document.getElementById('loanTerm').value;

    if (!purpose || !amount || amount <= 0) {
        alert('Please fill in all loan details');
        return;
    }

    alert(`Loan application submitted!\nPurpose: ${purpose}\nAmount: NGN ${amount}\nTerm: ${term} months`);
    document.getElementById('loanPurpose').value = '';
    document.getElementById('loanAmount').value = '';
    document.getElementById('loanTerm').value = '6';
}

// Initialize
window.onload = function() {
    displayGoals();

    // Mock wallet balance updates
    document.getElementById('fiatWallet').addEventListener('change', function() {
        const balance = this.value === 'Naira Balance' ? 'NGN10.30' : 'USD0.01';
        document.getElementById('fiatBalance').textContent = balance;
    });

    document.getElementById('digitalWallet').addEventListener('change', function() {
        const balance = this.value === 'tNGN' ? 'tNGN *******' : 'tUSD *******';
        document.getElementById('digitalBalance').textContent = balance;
    });
};