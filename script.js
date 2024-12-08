// Event Listener for Conversion
document.getElementById("length").addEventListener("input", handleConversion);

// Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);

const historyList = document.getElementById("history");

function handleConversion() {
    const length = parseFloat(document.getElementById("length").value);
    const unit = document.getElementById("unit").value;

    if (isNaN(length)) return;

    const conversions = convertLength(length, unit);
    displayResults(conversions);
    updateHistory(length, unit, conversions);
}

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

function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

function updateHistory(length, unit, conversions) {
    const historyItem = document.createElement("li");
    historyItem.textContent = `Input: ${length} ${unit}, Converted to: ${JSON.stringify(conversions)}`;
    historyList.appendChild(historyItem);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
