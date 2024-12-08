document.getElementById("convert-button").addEventListener("click", function () {
    const length = parseFloat(document.getElementById("length").value);
    const unit = document.getElementById("unit").value;

    if (isNaN(length)) {
        alert("Please enter a valid number.");
        return;
    }

    // Show the progress bar
    document.getElementById("progress-bar").style.width = "0%";
    setTimeout(function () {
        document.getElementById("progress-bar").style.width = "100%";
    }, 100);

    const conversions = convertLength(length, unit);
    displayResults(conversions);
    addToHistory(length, unit, conversions);

    // Reset progress bar after a short delay
    setTimeout(function () {
        document.getElementById("progress-bar").style.width = "0%";
    }, 2000);

    // Show success message
    showSuccessMessage();
});

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

function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.textContent = `Converted ${length} ${unit} → ${JSON.stringify(conversions)}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        historyItem.remove();
    };
    
    historyItem.appendChild(deleteButton);
    historyList.appendChild(historyItem);
}

function showSuccessMessage() {
    const successMessage = document.getElementById("success-message");
    successMessage.classList.remove("hidden");
    setTimeout(function () {
        successMessage.classList.add("hidden");
    }, 2000);  // Hide message after 2 seconds
}

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("length").value = '';
    document.getElementById("unit").selectedIndex = 0;
    document.getElementById("results").innerHTML = '';
    document.getElementById("history").innerHTML = '';
});
