document.addEventListener("DOMContentLoaded", function () {
    const locations = [];
    const expenseList = document.getElementById("expenses");

    // Function to add a new location
    function addLocation(locationName) {
        locations.push({ name: locationName, expenses: [] });
        renderLocationOptions();
    }

    // Function to render location options
    function renderLocationOptions() {
        const locationSelect = document.getElementById("location-select");
        locationSelect.innerHTML = "";
        locations.forEach(location => {
            const option = document.createElement("option");
            option.value = location.name;
            option.textContent = location.name;
            locationSelect.appendChild(option);
        });
    }

    // Function to add an expense to a location
    function addExpense(locationName, description, amount, category) {
        const location = locations.find(loc => loc.name === locationName);
        if (location) {
            location.expenses.push({ description, amount, category });
            renderExpenseList(location);
            saveDataToLocalStorage();
        }
    }

    // Function to render the expense list for a location
    function renderExpenseList(location) {
        expenseList.innerHTML = "";
        location.expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.description} - Rs.${expense.amount.toFixed(2)} (${expense.category})
                <button class="edit" data-location="${location.name}" data-index="${index}">Edit</button>
                <button class="delete" data-location="${location.name}" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    // Function to save data to local storage
    function saveDataToLocalStorage() {
        localStorage.setItem("expenseData", JSON.stringify(locations));
    }

    // Function to load data from local storage
    function loadDataFromLocalStorage() {
        const storedData = localStorage.getItem("expenseData");
        if (storedData) {
            locations.length = 0;
            const parsedData = JSON.parse(storedData);
            parsedData.forEach(location => {
                locations.push(location);
            });
            renderLocationOptions();
            const selectedLocation = document.getElementById("location-select").value;
            const selectedLocationObj = locations.find(loc => loc.name === selectedLocation);
            if (selectedLocationObj) {
                renderExpenseList(selectedLocationObj);
            }
        }
    }

    // Event listener for adding a new location
    const addLocationBtn = document.getElementById("add-location-btn");
    addLocationBtn.addEventListener("click", () => {
        const locationName = document.getElementById("location-name").value;
        if (locationName) {
            addLocation(locationName);
            document.getElementById("location-name").value = "";
        }
    });

    // Event listener for adding an expense
    const addExpenseBtn = document.getElementById("add-expense-btn");
    addExpenseBtn.addEventListener("click", () => {
        const locationName = document.getElementById("location-select").value;
        const description = document.getElementById("expense-description").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        if (locationName && description && !isNaN(amount)) {
            addExpense(locationName, description, amount, category);
            document.getElementById("expense-description").value = "";
            document.getElementById("expense-amount").value = "";
        }
    });

    // Event listener for editing or deleting an expense
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit")) {
            const locationName = e.target.getAttribute("data-location");
            const index = parseInt(e.target.getAttribute("data-index"));
            const location = locations.find(loc => loc.name === locationName);

            if (location && location.expenses[index]) {
                const expense = location.expenses[index];
                const newDescription = prompt("Enter new description:", expense.description);
                if (newDescription !== null) {
                    expense.description = newDescription;
                    renderExpenseList(location);
                    saveDataToLocalStorage();
                }
            }
        } else if (e.target.classList.contains("delete")) {
            const locationName = e.target.getAttribute("data-location");
            const index = parseInt(e.target.getAttribute("data-index"));
            const location = locations.find(loc => loc.name === locationName);

            if (location && location.expenses[index]) {
                location.expenses.splice(index, 1);
                renderExpenseList(location);
                saveDataToLocalStorage();
            }
        }
    });

    // Event listener for location selection
    const locationSelect = document.getElementById("location-select");
    locationSelect.addEventListener("change", () => {
        const selectedLocation = locationSelect.value;
        const selectedLocationObj = locations.find(loc => loc.name === selectedLocation);
        if (selectedLocationObj) {
            renderExpenseList(selectedLocationObj);
        }
    });

    // Load data from local storage when the page loads
    loadDataFromLocalStorage();
});
