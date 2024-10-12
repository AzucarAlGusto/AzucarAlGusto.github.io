// Google Sheet ID and sheet name
const sheetId = "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU";
const sheetName = encodeURIComponent("Ventas");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
alert("Versión 1.2");

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
        
        // Call the function to create the desserts sold table
        createDessertsSoldTable(data);
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

// Function to create a desserts sold table
function createDessertsSoldTable(data) {
    const dessertCounts = {}; // Object to hold dessert counts

    // Count each dessert sold
    data.forEach(row => {
        const dessertName = row["postres vendidos"]; // Replace with actual column name
        if (dessertName) {
            dessertCounts[dessertName] = (dessertCounts[dessertName] || 0) + 1;
        }
    });

    // Convert the dessertCounts object into an array for rendering
    const dessertData = Object.entries(dessertCounts).map(([dessert, count]) => ({
        "Postres": dessert,
        "Pz Vendidas": count
    }));

    // Render the dessert sold table
    let dessertTableHtml = '<table border="1"><thead><tr><th>Postres</th><th>Pz Vendidas</th></tr></thead><tbody>';
    
    dessertData.forEach(row => {
        dessertTableHtml += '<tr>';
        dessertTableHtml += `<td>${row.Postres}</td>`;
        dessertTableHtml += `<td>${row["Pz Vendidas"]}</td>`;
        dessertTableHtml += '</tr>';
    });
    dessertTableHtml += '</tbody></table>';
    
    // Insert the dessert sold table HTML into the page
    $('#p2Chart').html(dessertTableHtml);
}
