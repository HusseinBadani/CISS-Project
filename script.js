document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("convert-button").addEventListener("click", function () {
        const length = parseFloat(document.getElementById("length").value);
        const unit = document.getElementById("unit").value;

        if (isNaN(length)) {
            alert("Please enter a valid number.");
            return;
        }

        const conversions = convertLength(length, unit);
        displayResults(conversions);
        drawChart(conversions);
    });
});

function convertLength(value, unit) {
    let meters;

    // Convert input to meters
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
    }

    // Convert meters to other units
    return {
        Meters: meters.toFixed(2),
        Centimeters: (meters * 100).toFixed(2),
        Feet: (meters * 3.28084).toFixed(2),
        Inches: (meters * 39.3701).toFixed(2),
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

function drawChart(conversions) {
    const ctx = document.getElementById("chart").getContext("2d");
    const data = {
        labels: Object.keys(conversions),
        datasets: [{
            label: "Length Conversion",
            data: Object.values(conversions),
            backgroundColor: ["blue", "green", "orange", "red"],
        }],
    };

    // Clear previous chart
    if (window.chart) {
        window.chart.destroy();
    }

    window.chart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Units",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Values",
                    },
                },
            },
        },
    });
}
