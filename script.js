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
});

document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("length").value = "";
    document.getElementById("unit").value = "meters";
    document.getElementById("results").innerHTML = "";
    document.getElementById("history").innerHTML = "";
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

// Display Results
function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";
    for (let unit in conversions) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${conversions[unit]}`;
        resultsList.appendChild(listItem);
    }
}

// Add Conversion History
function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.textContent = `${length} ${unit} → Meters: ${conversions.Meters}, Centimeters: ${conversions.Centimeters}, Feet: ${conversions.Feet}, Inches: ${conversions.Inches}, Kilometers: ${conversions.Kilometers}, Miles: ${conversions.Miles}`;

    historyList.appendChild(historyItem);
}

// Edit History Button
document.getElementById("edit-history").addEventListener("click", function () {
    const historyList = document.getElementById("history");
    historyList.classList.toggle("editing");
    if (historyList.classList.contains("editing")) {
        document.getElementById("edit-history").textContent = "Save History";
    } else {
        document.getElementById("edit-history").textContent = "Edit History";
    }
});

// Night Mode Toggle
document.getElementById("night-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("night-mode");
    document.querySelector("header").classList.toggle("night-mode");
    document.querySelector("main").classList.toggle("night-mode");
    document.querySelectorAll("button").forEach(button => button.classList.toggle("night-mode"));
});

// Change Background Color
document.getElementById("change-bg").addEventListener("click", function () {
    document.body.style.backgroundColor = randomColor();
});

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
