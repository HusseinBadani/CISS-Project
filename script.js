// Length Converter Logic
document.getElementById("convert-button").addEventListener("click", function () {
    const length = parseFloat(document.getElementById("length").value);
    const unit = document.getElementById("unit").value;

    if (isNaN(length)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertLength(length, unit);
    displayResults(conversions);
    addToHistory(length, unit, conversions);

    // Show success message with animation
    showSuccessMessage();
});

// Conversion Logic
function convertLength(value, unit) {
    let meters;

    switch (unit) {
        case "meters": meters = value; break;
        case "centimeters": meters = value / 100; break;
        case "feet": meters = value / 3.28084; break;
        case "inches": meters = value / 39.3701; break;
        case "kilometers": meters = value / 1000; break;
        case "miles": meters = value / 1609.34; break;
    }

    return {
        Meters: meters.toFixed(2),
        Centimeters: (meters * 100).toFixed(2),
        Feet: (meters * 3.28084).toFixed(2),
        Inches: (meters * 39.3701).toFixed(2),
        Kilometers: (meters / 1000).toFixed(2),
        Miles: (meters / 1609.34).toFixed(2),
    };
}

// Display Conversion Results
function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

// Conversion History with Deletion
let isEditMode = false;

document.getElementById("edit-history").addEventListener("click", function () {
    isEditMode = !isEditMode;
    const historyItems = document.querySelectorAll(".history-item");
    historyItems.forEach(item => {
        const deleteButton = item.querySelector(".delete-button");
        deleteButton.style.display = isEditMode ? "inline" : "none";  // Show delete button in edit mode
    });
});

// Add to History
function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.classList.add("history-item");

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.style.display = "none";  // Hide delete button initially
    deleteButton.addEventListener("click", function () {
        historyItem.remove();  // Remove history item when delete button is clicked
    });

    // Display history item
    historyItem.textContent = `Converted ${length} ${unit} → ${JSON.stringify(conversions)}`;
    historyItem.appendChild(deleteButton);
    historyList.appendChild(historyItem);
}

// Success Message Animation
function showSuccessMessage() {
    const successMessage = document.getElementById("success-message");
    successMessage.classList.remove("hidden");
    setTimeout(function () {
        successMessage.classList.add("hidden");
    }, 2000);  // Hide message after 2 seconds
}
