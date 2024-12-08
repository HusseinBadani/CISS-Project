// Length Converter Logic
document.getElementById("convert-button").addEventListener("click", function () {
    const length = parseFloat(document.getElementById("length").value); // Get the length value from input
    const unit = document.getElementById("unit").value; // Get the selected unit

    if (isNaN(length)) {
        alert("Please enter a valid number.");
        return;
    }

    // Perform the conversion and get results
    const conversions = convertLength(length, unit);

    // Display the conversion results
    displayResults(conversions);

    // Add the conversion to the history
    addToHistory(length, unit, conversions);
});

function convertLength(value, unit) {
    let meters;

    // Convert the input length to meters based on the selected unit
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
            meters = value / 1000;
            break;
        case "miles":
            meters = value / 1609.34;
            break;
        default:
            meters = value;
    }

    // Return an object with converted values for each unit
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
    resultsList.innerHTML = ""; // Clear previous results

    // Loop through the conversion results and display them
    for (const [unit, value] of Object.entries(conversions)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${unit}: ${value}`; // Create a list item with the conversion result
        resultsList.appendChild(listItem); // Add it to the results list
    }
}

function addToHistory(length, unit, conversions) {
    const historyList = document.getElementById("history");
    const historyItem = document.createElement("li");
    historyItem.textContent = `Converted ${length} ${unit} → ${JSON.stringify(conversions)}`;
    historyList.appendChild(historyItem); // Add the conversion history item
}

document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("length").value = "";
    document.getElementById("unit").value = "meters";
    document.getElementById("results").innerHTML = "";
    document.getElementById("history").innerHTML = "";
});

// Background Color Change Logic
document.getElementById("change-bg").addEventListener("click", function () {
    document.body.style.backgroundColor = randomColor();
});

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Edit History Functionality
document.getElementById("edit-history").addEventListener("click", function () {
    const historyItems = document.querySelectorAll("#history li");
    historyItems.forEach(function (item) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.addEventListener("click", function () {
            item.remove();
        });
        item.appendChild(deleteButton); // Add delete button next to each history item
    });
});
