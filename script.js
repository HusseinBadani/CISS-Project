document.querySelectorAll("#converter-tabs button").forEach((button) => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".converter-section").forEach((section) => {
            section.classList.add("hidden");
        });
        document.querySelector(`#${this.dataset.target}`).classList.remove("hidden");

        document.querySelectorAll("#converter-tabs button").forEach((btn) => btn.classList.remove("active-tab"));
        this.classList.add("active-tab");
    });
});

document.getElementById("change-language").addEventListener("click", function () {
    document.querySelectorAll("h1, h2, h3, h4, label, button").forEach((element) => {
        const translations = {
            "Hussein's Final Project": "Proyecto Final de Hussein",
            "CISS100": "CISS100",
            "Length Converter": "Convertidor de Longitud",
            "Temperature Converter": "Convertidor de Temperatura",
            "Weight Converter": "Convertidor de Peso",
            "Enter Length:": "Ingresar Longitud:",
            "Select Unit:": "Seleccionar Unidad:",
            "Convert": "Convertir",
            "Enter Temperature:": "Ingresar Temperatura:",
            "Enter Weight:": "Ingresar Peso:",
            "Change Background": "Cambiar Fondo",
            "Reset": "Restablecer",
            "Conversion History:": "Historial de Conversiones:",
        };
        if (translations[element.textContent]) {
            element.textContent = translations[element.textContent];
        }
    });
    alert("Idioma cambiado a español.");
});

document.getElementById("length-convert").addEventListener("click", function () {
    const length = parseFloat(document.getElementById("length").value);
    const unit = document.getElementById("length-unit").value;

    if (isNaN(length)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertLength(length, unit);
    displayResults(conversions, "length-results");
    addToHistory(length, unit, conversions, "Length");
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

document.getElementById("temperature-convert").addEventListener("click", function () {
    const temp = parseFloat(document.getElementById("temperature").value);
    const unit = document.getElementById("temperature-unit").value;

    if (isNaN(temp)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertTemperature(temp, unit);
    displayResults(conversions, "temperature-results");
    addToHistory(temp, unit, conversions, "Temperature");
});

function convertTemperature(value, unit) {
    switch (unit) {
        case "celsius":
            return {
                Celsius: value.toFixed(2),
                Fahrenheit: ((value * 9 / 5) + 32).toFixed(2),
                Kelvin: (value + 273.15).toFixed(2),
            };
        case "fahrenheit":
            return {
                Celsius: ((value - 32) * 5 / 9).toFixed(2),
                Fahrenheit: value.toFixed(2),
                Kelvin: (((value - 32) * 5 / 9) + 273.15).toFixed(2),
            };
        case "kelvin":
            return {
                Celsius: (value - 273.15).toFixed(2),
                Fahrenheit: (((value - 273.15) * 9 / 5) + 32).toFixed(2),
                Kelvin: value.toFixed(2),
            };
    }
}

document.getElementById("weight-convert").addEventListener("click", function () {
    const weight = parseFloat(document.getElementById("weight").value);
    const unit = document.getElementById("weight-unit").value;

    if (isNaN(weight)) {
        alert("Please enter a valid number.");
        return;
    }

    const conversions = convertWeight(weight, unit);
    displayResults(conversions, "weight-results");
    addToHistory(weight, unit, conversions, "Weight");
});

function convertWeight(value, unit) {
    let kilograms;
    switch (unit) {
        case "kilograms": kilograms = value; break;
        case "pounds": kilograms = value / 2.20462; break;
        case "grams": kilograms = value / 1000; break;
        case "ounces": kilograms = value / 35.274; break;
        case "tons": kilograms = value * 1000; break;
    }
    return {
        Kilograms: kilograms.toFixed(2),
        Pounds: (kilograms * 2.20462).toFixed(2),
        Grams: (kilograms * 1000).toFixed(2),
        Ounces: (kilograms * 35.274).toFixed(2),
        Tons: (kilograms / 1000).toFixed(2),
    };
}

function displayResults(conversions, resultId) {
    const resultsList = document.getElementById(resultId);
    resultsList.innerHTML = "";
    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

function addToHistory(input, unit, conversions, type) {
    const historyList = document.getElementById("history-list");
    const historyItem = document.createElement("li");
    const conversionText = Object.entries(conversions)
        .map(([unit, value]) => `${unit}: ${value}`)
        .join("\n");
    historyItem.textContent = `${type} - Converted ${input} ${unit}:\n${conversionText}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => historyItem.remove());
    historyItem.appendChild(deleteBtn);
    historyList.appendChild(historyItem);
}

const colors = ["lightgray", "white", "lightblue", "lightgreen", "lightpink"];
let colorIndex = 0;

document.getElementById("change-bg").addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
});

document.getElementById("reset").addEventListener("click", function () {
    document.querySelectorAll("form input").forEach((input) => (input.value = ""));
    document.querySelectorAll("ul").forEach((list) => (list.innerHTML = ""));
    document.querySelector("#length-converter").classList.remove("hidden");
    document.querySelectorAll(".converter-section:not(#length-converter)").forEach((section) =>
        section.classList.add("hidden")
    );
    document.querySelectorAll("#converter-tabs button").forEach((btn) => btn.classList.remove("active-tab"));
    document.querySelector("#converter-tabs button[data-target='length-converter']").classList.add("active-tab");
    document.body.style.backgroundColor = "lightgray";
});
