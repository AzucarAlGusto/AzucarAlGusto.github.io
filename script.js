// Google Sheet ID and sheet name
const sheetId = "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU";
const sheetName = encodeURIComponent("Ventas");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
alert("Versión 1.8");

// Load data using jQuery
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: sheetURL,
        dataType: "text",
        success: function (response) {
            var data = $.csv.toObjects(response);
            console.log(data);
            
            // Render table and charts
            renderTable(data);
            drawCharts(data);
        },
        error: function (error) {
            console.error("Error loading data:", error);
        }
    });
});

function renderTable(data) {
    // Render the data in the table format
    const table = $('#dataTable');
    table.empty(); // Clear previous data

    // Add header row
    table.append('<tr><th>Fecha</th><th>Postre</th><th>Cantidad</th><th>Precio</th></tr>');

    // Add each row of data
    data.forEach(row => {
        const tr = $('<tr>').append(
            $('<td>').text(row.Fecha),
            $('<td>').text(row.Postre),
            $('<td>').text(row.Cantidad),
            $('<td>').text(row.Precio)
        );
        table.append(tr);
    });
}

function drawCharts(data) {
    // Example chart drawing logic
    const chartData = google.visualization.arrayToDataTable(data.map(item => [item.Postre, parseInt(item.Cantidad)]));

    const options = {
        title: 'Cantidad de Postres Vendidos',
        pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
}
