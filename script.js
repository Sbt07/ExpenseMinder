document.addEventListener("DOMContentLoaded", function () {
    const expenses = [];

    function updateExpenseList() {
        const expensesList = document.getElementById("expenses");
        expensesList.innerHTML = "";

        const filterCategory = document.getElementById("filter-category").value;

        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];

            if (filterCategory === "all" || expense.category === filterCategory) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div>
                        <strong>${expense.description}</strong>
                        <span class="amount">Rs.${expense.amount.toFixed(2)}</span>
                        <span class="category">${expense.category}</span>
                    </div>
                    <div class="actions">
                        <button class="edit" data-index="${i}">Edit</button>
                        <button class="delete" data-index="${i}">Delete</button>
                    </div>
                `;
                expensesList.appendChild(li);
            }
        }
    }

    const addExpenseBtn = document.getElementById("add-expense-btn");
    addExpenseBtn.addEventListener("click", function () {
        const descriptionInput = document.getElementById("expense-description");
        const amountInput = document.getElementById("expense-amount");
        const categorySelect = document.getElementById("expense-category");

        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;

        if (description && !isNaN(amount)) {
            expenses.push({ description, amount, category });
            descriptionInput.value = "";
            amountInput.value = "";
            updateExpenseList();
        }
    });

    document.getElementById("expenses").addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            expenses.splice(index, 1);
            updateExpenseList();
        } else if (e.target.classList.contains("edit")) {
            const index = e.target.getAttribute("data-index");
            const expense = expenses[index];
            const newDescription = prompt("Enter new description:", expense.description);
            if (newDescription !== null) {
                expense.description = newDescription;
                updateExpenseList();
            }
        }
    });

    document.getElementById("filter-category").addEventListener("change", function () {
        updateExpenseList();
    });
});
