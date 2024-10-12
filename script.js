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
        
        // Render table
        renderTable(data);
        drawCharts(data);
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

// Function to draw charts (You can adapt this as needed)
function drawCharts(data) {
    google.charts.load('current', { 'packages': ['corechart', 'bar', 'table'] });
    google.charts.setOnLoadCallback(() => {
        drawTableChart(data);
        drawBarChart(data);
        drawPieChart(data);
        drawAreaChart(data);
    });
}

function drawTableChart(data) {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Nombre'); // Change 'Nombre' to the appropriate column name
    dataTable.addColumn('number', 'Cantidad'); // Change 'Cantidad' to the appropriate column name
    data.forEach(row => {
        dataTable.addRow([row['Nombre'], Number(row['Cantidad'])]); // Adjust based on your data
    });

    const table = new google.visualization.Table(document.getElementById('p1Chart'));
    table.draw(dataTable, { showRowNumber: true, width: '100%', height: '100%' });
}

// Example functions to draw different types of charts
function drawBarChart(data) {
    // Implement based on your specific needs
}

function drawPieChart(data) {
    // Implement based on your specific needs
}

function drawAreaChart(data) {
    // Implement based on your specific needs
}
