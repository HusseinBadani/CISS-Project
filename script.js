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

// Display Conversion Results
function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`;
        resultsList.appendChild(listItem);
    }
}

// Add to Conversion History
function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.textContent = `${length} ${unit} → Meters: ${conversions.Meters}, Centimeters: ${conversions.Centimeters}, Feet: ${conversions.Feet}, Inches: ${conversions.Inches}, Kilometers: ${conversions.Kilometers}, Miles: ${conversions.Miles}`;
    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
        historyItem.classList.toggle("editing");
        if (historyItem.classList.contains("editing")) {
            editButton.textContent = "Save";
        } else {
            editButton.textContent = "Edit";
        }
    });
    
    historyItem.appendChild(editButton);
    historyList.appendChild(historyItem);
}

// Night Mode Toggle
document.getElementById("night-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("night-mode");
    document.querySelector("header").classList.toggle("night-mode");
    document.querySelector("main").classList.toggle("night-mode");
    document.querySelectorAll("button").forEach(button => button.classList.toggle("night-mode"));
});

// Reset Button (resets everything to default)
document.getElementById("reset-button").addEventListener("click", function() {
    document.getElementById("length").value = "";
    document.getElementById("unit").value = "meters";
    document.getElementById("results").innerHTML = "";
    document.getElementById("history").innerHTML = "";
});

