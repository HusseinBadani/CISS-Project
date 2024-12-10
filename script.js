// Toggle Between Converters
document.getElementById("length-converter-btn").addEventListener("click", function () {
    document.getElementById("length-converter").classList.remove("hidden");
    document.getElementById("temperature-converter").classList.add("hidden");
});

document.getElementById("temp-converter-btn").addEventListener("click", function () {
    document.getElementById("temperature-converter").classList.remove("hidden");
    document.getElementById("length-converter").classList.add("hidden");
});

// Length Converter Logic
document.getElementById("convert-button").addEventListener("click", function () {
    const length = parseFloat(document.getElementById("length").value);
    const unit = document.getElementById("unit").value;

    if (isNaN(length)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertLength(length, unit);
    displayResults(conversions, "results");
    addToHistory(length, unit, conversions, "history");
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

// Temperature Converter Logic
document.getElementById("convert-temp-button").addEventListener("click", function () {
    const temp = parseFloat(document.getElementById("temperature").value);
    const unit = document.getElementById("temp-unit").value;

    if (isNaN(temp)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertTemperature(temp, unit);
    displayResults(conversions, "temp-results");
    addToHistory(temp, unit, conversions, "temp-history");
});

function convertTemperature(value, unit) {
    let celsius;

    switch (unit) {
        case "celsius": celsius = value; break;
        case "fahrenheit": celsius = (value - 32) * (5 / 9); break;
        case "kelvin": celsius = value - 273.15; break;
    }

    return {
        Celsius: celsius.toFixed(2),
        Fahrenheit: ((celsius * 9) / 5 + 32).toFixed(2),
        Kelvin: (celsius + 273.15).toFixed(2),
    };
}

// Display Results Function
function displayResults(conversions, resultsId) {
    const resultsList = document.getElementById(resultsId);
    resultsList.innerHTML = "";  

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

// Add to History Function
function addToHistory(value, unit, conversions, historyId) {
    const historyList = document.getElementById(historyId);
    const historyItem = document.createElement("li");

    const formattedConversions = Object.entries(conversions)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", ");
    historyItem.innerHTML = `Converted ${value} ${unit} → ${formattedConversions}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        historyItem.remove(); 
    };

    historyItem.appendChild(deleteButton);
    historyList.appendChild(historyItem);
}

// Reset Button
document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("length").value = "";
    document.getElementById("unit").value = "meters";
    document.getElementById("results").innerHTML = "";
    document.getElementById("history").innerHTML = "";

    document.getElementById("temperature").value = "";
    document.getElementById("temp-unit").value = "celsius";
    document.getElementById("temp-results").innerHTML = "";
    document.getElementById("temp-history").innerHTML = "";

    document.body.style.backgroundColor = "lightgray"; 
});

// Change Background Color
document.getElementById("change-bg").addEventListener("click", function () {
    const randomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    document.body.style.backgroundColor = randomColor();
});
