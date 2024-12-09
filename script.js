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

function displayResults(conversions) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";  

    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = ${unit}: ${value};
        resultsList.appendChild(listItem);
    }
}

function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.classList.add("history-item");

    historyItem.innerHTML = Converted ${length} ${unit} → ${JSON.stringify(conversions)};
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        historyItem.remove(); 
    };

    historyItem.appendChild(deleteButton);
    historyList.appendChild(historyItem);
}

function changeBackgroundColor(length) {
    let r = length % 256; 
    let g = (length * 2) % 256;
    let b = (length * 3) % 256;
    document.body.style.backgroundColor = rgb(${r}, ${g}, ${b});
}

document.getElementById("change-bg").addEventListener("click", function () {
    document.body.style.backgroundColor = randomColor();
});

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return rgb(${r}, ${g}, ${b});
}

document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("length").value = "";
    document.getElementById("unit").value = "meters";
    document.getElementById("results").innerHTML = "";
    document.getElementById("history").innerHTML = "";
    document.body.style.backgroundColor = "lightgray"; 
});
