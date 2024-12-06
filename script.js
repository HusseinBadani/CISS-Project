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

    // Change background based on length input
    changeBackgroundColor(length);

    // Show success message with animation
    showSuccessMessage();
});

function convertLength(value, unit) {
    let meters;

    switch (unit) {
        case "meters": meters = value; break;
        case "centimeters": meters = value / 100; break;
        case "feet": meters = value / 3.28084; break;
        case "inches": meters = value / 39.3701; break;
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

function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.textContent = `Converted ${length} ${unit} → ${JSON.stringify(conversions)}`;
    historyList.appendChild(historyItem);
}

// Dynamic Background Color Based on Length
function changeBackgroundColor(length) {
    let r = length % 256;  // Use length for color calculation
    let g = (length * 2) % 256;
    let b = (length * 3) % 256;
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Success Message Animation
function showSuccessMessage() {
    const successMessage = document.getElementById("success-message");
    successMessage.classList.remove("hidden");
    setTimeout(function () {
        successMessage.classList.add("hidden");
    }, 2000);  // Hide message after 2 seconds
}

// Dynamic Background Color Button
document.getElementById("change-bg").addEventListener("click", function () {
    document.body.style.backgroundColor = randomColor();
});

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
