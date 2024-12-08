// Event listener for the Convert button
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
});

// Function to convert length
function convertLength(value, unit) {
    let meters;

    switch (unit) {
        case "meters":
            meters = value;
            break;
        case "centimeters":
            meters = value / 100;
            break;
        case "feet":
            meters = value / 3.28084;
            break;
        case "inches":
            meters = value / 39.3701;
            break;
    }

    return {
        Meters: meters.toFixed(2),
        Centimeters: (meters * 100).toFixed(2),
        Feet: (meters * 3.28084).toFixed(2),
        Inches: (meters * 39.3701).toFixed(2),
    };
}

// Function to display results
function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

// Function to add conversion to history
function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.textContent = `${length} ${unit} = ${Object.values(conversions).join(", ")}`;
    historyList.appendChild(historyItem);
}

// Dark mode toggle
document.getElementById("dark-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});
