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
        alert("Please enter a valid number for length.");
        return;
    }

    const results = convertLength(length, unit);
    displayResults("length-results", results);
    addToHistory("length-history", length, unit, results);
});

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
        case "kilometers":
            meters = value * 1000;
            break;
        case "miles":
            meters = value * 1609.34;
            break;
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
        alert("Please enter a valid number for temperature.");
        return;
    }

    const results = convertTemperature(temperature, unit);
    displayResults("temperature-results", results);
    addToHistory("temperature-history", temperature, unit, results);
});

function convertTemperature(value, unit) {
    if (unit === "celsius") {
        return {
            Celsius: value.toFixed(2),
            Fahrenheit: ((value * 9) / 5 + 32).toFixed(2),
            Kelvin: (value + 273.15).toFixed(2),
        };
    } else if (unit === "fahrenheit") {
        const celsius = ((value - 32) * 5) / 9;
        return {
            Celsius: celsius.toFixed(2),
            Fahrenheit: value.toFixed(2),
            Kelvin: (celsius + 273.15).toFixed(2),
        };
    } else {
        return {
            Celsius: (value - 273.15).toFixed(2),
            Fahrenheit: (((value - 273.15) * 9) / 5 + 32).toFixed(2),
            Kelvin: value.toFixed(2),
        };
    }
}

// Utility Functions
function displayResults(resultId, results) {
    const resultContainer = document.getElementById(resultId);
    resultContainer.innerHTML = "";

    for (const [unit, value] of Object.entries(results)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultContainer.appendChild(listItem);
    }
}

function addToHistory(historyId, input, unit, results) {
    const historyContainer = document.getElementById(historyId);
    const historyItem = document.createElement("li");

    const formattedResults = Object.entries(results)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    historyItem.textContent = `Converted ${input} ${unit} → ${formattedResults}`;

    // Add Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => {
        historyContainer.removeChild(historyItem);
    });

    historyItem.appendChild(deleteButton);
    historyContainer.appendChild(historyItem);
}

// Background and Reset Buttons
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
