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
    
    // Column headers
    const headers = ["Date", "Dia", "Postre Vendido", "Precio", "Costo", "Ganancia"];
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

