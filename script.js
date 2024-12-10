// Tab Switching
document.getElementById("length-tab").addEventListener("click", () => {
    document.getElementById("length-converter").classList.remove("hidden");
    document.getElementById("temperature-converter").classList.add("hidden");
    document.getElementById("length-tab").classList.add("active-tab");
    document.getElementById("temperature-tab").classList.remove("active-tab");
});

document.getElementById("temperature-tab").addEventListener("click", () => {
    document.getElementById("temperature-converter").classList.remove("hidden");
    document.getElementById("length-converter").classList.add("hidden");
    document.getElementById("temperature-tab").classList.add("active-tab");
    document.getElementById("length-tab").classList.remove("active-tab");
});

// Length Conversion
document.getElementById("convert-length").addEventListener("click", () => {
    const length = parseFloat(document.getElementById("length").value);
    const unit = document.getElementById("length-unit").value;

    if (isNaN(length)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertLength(length, unit);
    displayResults("length-results", conversions);
    addToHistory("length-history", length, unit, conversions);
});

function convertLength(value, unit) {
    let meters;

    switch (unit) {
        case "meters": meters = value; break;
        case "centimeters": meters = value / 100; break;
        case "feet": meters = value / 3.28084; break;
        case "inches": meters = value / 39.3701; break;
        case "kilometers": meters = value * 1000; break;
        case "miles": meters = value * 1609.34; break;
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

// Temperature Conversion
document.getElementById("convert-temperature").addEventListener("click", () => {
    const temperature = parseFloat(document.getElementById("temperature").value);
    const unit = document.getElementById("temperature-unit").value;

    if (isNaN(temperature)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertTemperature(temperature, unit);
    displayResults("temperature-results", conversions);
    addToHistory("temperature-history", temperature, unit, conversions);
});

function convertTemperature(value, unit) {
    if (unit === "celsius") {
        return {
            Celsius: value.toFixed(2),
            Fahrenheit: ((value * 9) / 5 + 32).toFixed(2),
        };
    } else {
        return {
            Celsius: (((value - 32) * 5) / 9).toFixed(2),
            Fahrenheit: value.toFixed(2),
        };
    }
}

// Utility Functions
function displayResults(resultId, conversions) {
    const resultsList = document.getElementById(resultId);
    resultsList.innerHTML = "";

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

function addToHistory(historyId, input, unit, conversions) {
    const historyList = document.getElementById(historyId);
    const historyItem = document.createElement("li");

    const formattedConversions = Object.entries(conversions)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", ");
    historyItem.textContent = `Converted ${input} ${unit} → ${formattedConversions}`;
    historyList.appendChild(historyItem);
}

// Background and Reset
document.getElementById("change-bg").addEventListener("click", () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("length").value = "";
    document.getElementById("temperature").value = "";
    document.getElementById("length-results").innerHTML = "";
    document.getElementById("temperature-results").innerHTML = "";
    document.getElementById("length-history").innerHTML = "";
    document.getElementById("temperature-history").innerHTML = "";
    document.body.style.backgroundColor = "lightgray";
});
