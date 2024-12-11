// Switch Tabs
document.querySelectorAll("#converter-tabs button").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".converter-section").forEach(section => {
            section.classList.add("hidden");
        });
        document.querySelector(`#${this.dataset.target}`).classList.remove("hidden");

        document.querySelectorAll("#converter-tabs button").forEach(btn => btn.classList.remove("active-tab"));
        this.classList.add("active-tab");
    });
});

// Length Converter
document.getElementById("length-convert").addEventListener("click", function () {
    const length = parseFloat(document.getElementById("length").value);
    const unit = document.getElementById("length-unit").value;

    if (isNaN(length)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertLength(length, unit);
    displayResults(conversions, "length-results");
    addToHistory(length, unit, conversions, "length-history");
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
        Miles: (meters / 1609.34).toFixed(2)
    };
}

// Temperature Converter
document.getElementById("temperature-convert").addEventListener("click", function () {
    const temp = parseFloat(document.getElementById("temperature").value);
    const unit = document.getElementById("temperature-unit").value;

    if (isNaN(temp)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertTemperature(temp, unit);
    displayResults(conversions, "temperature-results");
    addToHistory(temp, unit, conversions, "temperature-history");
});

function convertTemperature(value, unit) {
    switch (unit) {
        case "celsius":
            return {
                Celsius: value.toFixed(2),
                Fahrenheit: ((value * 9/5) + 32).toFixed(2),
                Kelvin: (value + 273.15).toFixed(2)
            };
        case "fahrenheit":
            return {
                Celsius: ((value - 32) * 5/9).toFixed(2),
                Fahrenheit: value.toFixed(2),
                Kelvin: (((value - 32) * 5/9) + 273.15).toFixed(2)
            };
        case "kelvin":
            return {
                Celsius: (value - 273.15).toFixed(2),
                Fahrenheit: (((value - 273.15) * 9/5) + 32).toFixed(2),
                Kelvin: value.toFixed(2)
            };
    }
}

// Common Functions
function displayResults(conversions, resultId) {
    const resultsList = document.getElementById(resultId);
    resultsList.innerHTML = "";
    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

function addToHistory(input, unit, conversions, historyId) {
    const historyList = document.getElementById(historyId);
    const historyItem = document.createElement("li");
    
    // Display conversions without quotes and braces
    const conversionText = Object.entries(conversions).map(([unit, value]) => `${unit}: ${value}`).join(", ");
    historyItem.textContent = `Converted ${input} ${unit} → ${conversionText}`;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => historyItem.remove());
    historyItem.appendChild(deleteBtn);
    historyList.appendChild(historyItem);
}

// Change Background
document.getElementById("change-bg").addEventListener("click", function () {
    document.body.style.backgroundColor = 
        document.body.style.backgroundColor === "lightgray" ? "white" : "lightgray";
});

// Reset
document.getElementById("reset").addEventListener("click", function () {
    document.querySelectorAll("form input").forEach(input => input.value = "");
    document.querySelectorAll("ul").forEach(list => list.innerHTML = "");
});
