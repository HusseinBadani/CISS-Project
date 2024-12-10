// Existing Length Conversion Logic
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

function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";  

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

// Temperature Conversion Logic
document.getElementById("convert-temp-button").addEventListener("click", function () {
    const temperature = parseFloat(document.getElementById("temperature").value);
    const unit = document.getElementById("temp-unit").value;

    if (isNaN(temperature)) {
        alert("Please enter a valid temperature.");
        return;
    }

    const conversions = convertTemperature(temperature, unit);
    displayTempResults(conversions);
});

function convertTemperature(value, unit) {
    let celsius;

    // Convert the input to Celsius first
    switch (unit) {
        case "celsius":
            celsius = value;
            break;
        case "fahrenheit":
            celsius = (value - 32) * 5 / 9;
            break;
        case "kelvin":
            celsius = value - 273.15;
            break;
    }

    // Convert from Celsius to other units
    return {
        Celsius: celsius.toFixed(2),
        Fahrenheit: ((celsius * 9 / 5) + 32).toFixed(2),
        Kelvin: (celsius + 273.15).toFixed(2)
    };
}

function displayTempResults(conversions) {
    const resultsList = document.getElementById("temp-results");
    resultsList.innerHTML = "";

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

// Other Features (Background Color, Reset)
document.getElementById("change-bg").addEventListener("click", function () {
    document.body.style.backgroundColor = randomColor();
});

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("length").value = "";
    document.getElementById("unit").value = "meters";
    document.getElementById("results").innerHTML = "";
    document.getElementById("history").innerHTML = "";
    document.getElementById("temperature").value = "";
    document.getElementById("temp-unit").value = "celsius";
    document.getElementById("temp-results").innerHTML = "";
    document.body.style.backgroundColor = "lightgray"; 
});
