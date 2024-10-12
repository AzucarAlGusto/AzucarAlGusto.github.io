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

// Function to draw charts
function drawCharts(data) {
    google.charts.load('current', { 'packages': ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(() => {
        drawSalesChart(data);
        drawDessertSalesChart(data);
        drawPriceChart(data);
        drawProfitChart(data);
    });
}

// Function to draw a sales chart
function drawSalesChart(data) {
    const salesData = new google.visualization.DataTable();
    salesData.addColumn('string', 'Dia');
    salesData.addColumn('number', 'Ventas');

    // Aggregate sales by day
    const salesByDay = {};
    data.forEach(row => {
        const day = row['Dia'];
        const sales = Number(row['Ganancia']);
        salesByDay[day] = (salesByDay[day] || 0) + sales;
    });

    for (const day in salesByDay) {
        salesData.addRow([day, salesByDay[day]]);
    }

    const salesChart = new google.visualization.ColumnChart(document.getElementById('p2Chart'));
    salesChart.draw(salesData, { title: 'Ventas Totales por Día', width: '100%', height: 400 });
}

// Function to draw a dessert sales chart
function drawDessertSalesChart(data) {
    const dessertData = new google.visualization.DataTable();
    dessertData.addColumn('string', 'Postre');
    dessertData.addColumn('number', 'Cantidad Vendida');

    // Aggregate sales by dessert
    const dessertSales = {};
    data.forEach(row => {
        const dessert = row['Postre Vendido'];
        const quantity = Number(row['Ganancia']); // or whatever metric to track
        dessertSales[dessert] = (dessertSales[dessert] || 0) + quantity;
    });

    for (const dessert in dessertSales) {
        dessertData.addRow([dessert, dessertSales[dessert]]);
    }

    const dessertChart = new google.visualization.PieChart(document.getElementById('p3Chart'));
    dessertChart.draw(dessertData, { title: 'Postres Vendidos', width: '100%', height: 400 });
}

// Function to draw a price chart
function drawPriceChart(data) {
    const priceData = new google.visualization.DataTable();
    priceData.addColumn('string', 'Postre');
    priceData.addColumn('number', 'Precio');

    // Aggregate prices
    const prices = {};
    data.forEach(row => {
        const dessert = row['Postre Vendido'];
        const price = Number(row['Precio']);
        prices[dessert] = price;
    });

    for (const dessert in prices) {
        priceData.addRow([dessert, prices[dessert]]);
    }

    const priceChart = new google.visualization.BarChart(document.getElementById('p4Chart'));
    priceChart.draw(priceData, { title: 'Precios de Postres', width: '100%', height: 400 });
}

// Function to draw a profit chart
function drawProfitChart(data) {
    const profitData = new google.visualization.DataTable();
    profitData.addColumn('string', 'Postre');
    profitData.addColumn('number', 'Ganancia');

    // Aggregate profits
    const profits = {};
    data.forEach(row => {
        const dessert = row['Postre Vendido'];
        const profit = Number(row['Ganancia']);
        profits[dessert] = (profits[dessert] || 0) + profit;
    });

    for (const dessert in profits) {
        profitData.addRow([dessert, profits[dessert]]);
    }

    const profitChart = new google.visualization.ColumnChart(document.getElementById('p5Chart'));
    profitChart.draw(profitData, { title: 'Ganancias Totales por Postre', width: '100%', height: 400 });
}
