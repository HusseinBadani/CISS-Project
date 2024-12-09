// Conversion Button
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

    changeBackgroundColor(length);
});

// Length Conversion Logic
function convertLength(value, unit) {
    let meters;

    if (unit === "meters") meters = value;
    else if (unit === "centimeters") meters = value / 100;
    else if (unit === "feet") meters = value / 3.28084;
    else if (unit === "inches") meters = value / 39.3701;
    else if (unit === "kilometers") meters = value / 1000;
    else if (unit === "miles") meters = value / 1609.34;

    return {
        Meters: (meters).toFixed(2),
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
    resultsList.innerHTML = ""; // Clear old results

    for (const unit in conversions) {
        const listItem = document.createElement("li");
        listItem.textContent = unit + ": " + conversions[unit];
        resultsList.appendChild(listItem);
    }
}

// Adding conversion to history
function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.textContent = "Converted " + length + " " + unit + " → " + JSON.stringify(conversions);
    historyList.appendChild(historyItem);
}

// background Color Change Based on Input
function changeBackgroundColor(length) {
    const r = length % 256;
    const g = (length * 2) % 256;
    const b = (length * 3) % 256;
    document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

// Reset Button
document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("length").value = "";
    document.getElementById("unit").value = "meters";
    document.getElementById("results").innerHTML = "";
    document.getElementById("history").innerHTML = "";
    document.body.style.backgroundColor = "lightgray"; // Default color
});
