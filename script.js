 


// document.addEventListener('DOMContentLoaded', () => {
//     const expenseForm = document.getElementById('expense-form');
//     const monthSelect = document.getElementById('month');
//     const yearSelect = document.getElementById('year');
//     const amountInput = document.getElementById('amount');
//     const expenseChart = document.getElementById('expense-chart');

//     let selectedMonth;
//     let selectedYear;
//     let chartInstance = null;

//     for (let year = 2020; year <= 2040; year++) {
//         const option = document.createElement('option');
//         option.value = year;
//         option.textContent = year;
//         yearSelect.appendChild(option);
//     }

//     const expenses = {};

//     function getExpensesFromLocalStorage(month, year) {
//         const key = `${month}-${year}`;
//         return JSON.parse(localStorage.getItem(key)) || {
//             Housing: 0,
//             Food: 0,
//             Transportation: 0,
//             Bills: 0,
//             Miscellaneous: 0
//         };
//     }

//     function saveExpensesToLocalStorage(month, year) {
//         const key = `${month}-${year}`;
//         localStorage.setItem(key, JSON.stringify(expenses[month]));
//     }

//     function getSelectedMonthYear() {
//         selectedMonth = monthSelect.value;
//         selectedYear = yearSelect.value;

//         if (!selectedMonth || !selectedYear) {
//             alert('Month or year not selected');
//             return false;
//         }

//         if (!expenses[selectedMonth]) {
//             expenses[selectedMonth] = getExpensesFromLocalStorage(selectedMonth, selectedYear);
//         }

//         return true;
//     }

//     function updateChart() {
//         if (!getSelectedMonthYear()) return;

//         const ctx = expenseChart.getContext('2d');

//         // if (chartInstance) {
//         //     chartInstance.destroy();
//         // }

//         chartInstance = new Chart(ctx, {
//             type: 'doughnut ',
//             data: {
//                 labels: Object.keys(expenses[selectedMonth]),
//                 datasets: [{
//                     data: Object.values(expenses[selectedMonth]),
//                     backgroundColor: [
//                         '#FF6384',
//                         '#4CAF50',
//                         '#FFCE56',
//                         '#36A2EB',
//                         '#FF9F40'
//                     ]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         display: true,
//                         position: 'top'
//                     },
//                     tooltip: {
//                         callbacks: {
//                             label: function (tooltipItem) {
//                                 return `${tooltipItem.label}: ${tooltipItem.raw}`;
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     }

//     function handleSubmit(event) {
//         event.preventDefault();

//         if (!getSelectedMonthYear()) return;

//         const category = event.target.category.value;
//         const amount = parseFloat(event.target.amount.value);

//         const currentAmount = expenses[selectedMonth][category] || 0;

//         if (amount > 0) {
//             expenses[selectedMonth][category] = currentAmount + amount;
//         } else if (amount < 0 && currentAmount >= Math.abs(amount)) {
//             expenses[selectedMonth][category] = currentAmount + amount;
//         } else {
//             alert('Invalid amount: Cannot reduce below zero.');
//             return;
//         }

//         saveExpensesToLocalStorage(selectedMonth, selectedYear);
//         updateChart();

//         amountInput.value = '';
//     }

//     expenseForm.addEventListener('submit', handleSubmit);
//      monthSelect.addEventListener('chnage' , updateChart);
//      yearSelect.addEventListener('change', updateChart);
//     function setDefaultMonthYear() {
//         const now = new Date();
//         const initialMonth = now.toLocaleString('default', { month: 'long' });
//         const initialYear = now.getFullYear();

//         monthSelect.value = initialMonth;
//         yearSelect.value = initialYear;
//     }

//     setDefaultMonthYear();
//     updateChart();
// });




const form = document.getElementById("expense-form");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");

let data = {
  Housing: 0,
  Food: 0,
  Transportation: 0,
  Bills: 0,
  Miscellaneous: 0
};

const ctx = document.getElementById("expenseChart").getContext("2d");

const chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: [
        "#f21d44",   // Housing
        "#1cb85d",   // Food
        "#e5a525",   // Transportation
        "#1e81c4",   // Bills
        "#f77c11"    // Misc
      ]
    }]
  },
  options: {
    responsive: true
  }
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  if (!amount || amount <= 0) return;

  data[category] += amount;

  chart.data.datasets[0].data = Object.values(data);
  chart.update();

  form.reset();
});