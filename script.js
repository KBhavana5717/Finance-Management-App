let budget = 0;
let remaining = 0;
let expenses = [];

function setBudget() {
  budget = parseFloat(document.getElementById("budgetInput").value) || 0;
  remaining = budget;
  updateDisplays();
}

function updateDisplays() {
  document.getElementById("budgetDisplay").textContent = `Budget: ₹${budget}`;
  document.getElementById("remainingDisplay").textContent = `Remaining: ₹${remaining}`;
}

function addExpense() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!desc || !amount || amount <= 0) return alert("Enter valid expense.");

  expenses.push({ desc, amount, category });
  remaining -= amount;
  updateDisplays();
  renderExpenses();
  renderChart();
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";
  expenses.forEach((e, i) => {
    const li = document.createElement("li");
    li.textContent = `${e.desc} - ₹${e.amount} (${e.category})`;
    list.appendChild(li);
  });
}

function renderChart() {
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const ctx = document.getElementById("expenseChart").getContext("2d");
  if (window.barChart) window.barChart.destroy();
  window.barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
