// Google Sheet ID and sheet name
const sheetId = "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU";
const sheetName = encodeURIComponent("Ventas");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

// Load data using jQuery
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
        drawTableChart(data);
    },
});

// Function to render table data
function renderTable(data) {
    let tableHtml = '<table border="1"><thead><tr>';
    
    // Assuming the first object has the keys we want as headers
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';
    
    // Populate the table with data
    data.forEach(row => {
        tableHtml += '<tr>';
        headers.forEach(header => {
            tableHtml += `<td>${row[header]}</td>`;
        });
        tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table>';
    
    // Insert table HTML into the page
    $('#p1Chart').html(tableHtml);
}

// Function to draw charts
function drawCharts(data) {
    google.charts.load('current', { 'packages': ['corechart', 'bar', 'table'] });
    google.charts.setOnLoadCallback(() => {
        drawTableChart(data);
        drawBarChart(data);
        drawPieChart(data);
        drawAreaChart(data);
    });
}

// Function to draw the table chart for desserts sold
function drawTableChart(data) {
    const dessertData = {};

    // Aggregate data for desserts sold
    data.forEach(row => {
        const postre = row['Postre Vendido'];
        const cantidad = Number(row['Precio']); // You might want to change this to "piezas vendidas" if you have that info
        if (dessertData[postre]) {
            dessertData[postre] += cantidad;
        } else {
            dessertData[postre] = cantidad;
        }
    });

    // Convert aggregated data into an array for Google Charts
    const chartData = [['Postre Vendido', 'Piezas Vendidas']];
    for (const postre in dessertData) {
        chartData.push([postre, dessertData[postre]]);
    }

    // Sort data alphabetically by postre
    chartData.sort((a, b) => a[0].localeCompare(b[0]));

    const dataTable = google.visualization.arrayToDataTable(chartData);

    // Draw the table
    const table = new google.visualization.Table(document.getElementById('p5Chart'));
    table.draw(dataTable, { showRowNumber: true, width: '100%', height: '100%' });
}

// Example functions to draw other types of charts
function drawBarChart(data) {
    // Implement based on your specific needs
}

function drawPieChart(data) {
    // Implement based on your specific needs
}

function drawAreaChart(data) {
    // Implement based on your specific needs
}
