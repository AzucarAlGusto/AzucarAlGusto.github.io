// URL del archivo CSV
const sheetURL = "URL_DEL_ARCHIVO_CSV";

// Cargar los datos usando jQuery
$.ajax({
    type: "GET",
    url: sheetURL,
    dataType: "text",
    success: function (response) {
        const data = $.csv.toObjects(response);
        console.log(data);
        
        // Renderizar la tabla
        renderTable(data);
        drawCharts(data);
    },
});

// Función para renderizar los datos en una tabla
function renderTable(data) {
    let tableHtml = '<table border="1"><thead><tr>';
    
    // Encabezados de columnas
    const headers = ["Date", "Dia", "Postre Vendido", "Precio", "Costo", "Ganancia"];
    headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';
    
    // Poblamos la tabla con los datos
    data.forEach(row => {
        tableHtml += '<tr>';
        headers.forEach(header => {
            tableHtml += `<td>${row[header]}</td>`;
        });
        tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table>';
    
    // Insertar el HTML de la tabla en la página
    $('#p1Chart').html(tableHtml);
}

// Función para dibujar gráficos
function drawCharts(data) {
    google.charts.load('current', { 'packages': ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(() => {
        drawSalesChart(data);
        drawDessertSalesChart(data);
        drawPriceChart(data);
        drawProfitChart(data);
    });
}

// Función para dibujar un gráfico de ventas
function drawSalesChart(data) {
    const salesData = new google.visualization.DataTable();
    salesData.addColumn('string', 'Dia');
    salesData.addColumn('number', 'Ventas');

    // Agregar las ventas por día
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

// Función para dibujar un gráfico de postres vendidos
function drawDessertSalesChart(data) {
    const dessertData = new google.visualization.DataTable();
    dessertData.addColumn('string', 'Postre');
    dessertData.addColumn('number', 'Cantidad Vendida');

    // Agregar ventas por postre
    const dessertSales = {};
    data.forEach(row => {
        const dessert = row['Postre Vendido'];
        const quantity = 1; // Contar cada entrada como una unidad vendida
        dessertSales[dessert] = (dessertSales[dessert] || 0) + quantity;
    });

    for (const dessert in dessertSales) {
        dessertData.addRow([dessert, dessertSales[dessert]]);
    }

    const dessertChart = new google.visualization.BarChart(document.getElementById('p3Chart'));
    dessertChart.draw(dessertData, { title: 'Postres Vendidos', width: '100%', height: 400 });
}

// Función para dibujar un gráfico de precios
function drawPriceChart(data) {
    const priceData = new google.visualization.DataTable();
    priceData.addColumn('string', 'Postre');
    priceData.addColumn('number', 'Precio');

    // Agregar precios
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

// Función para dibujar un gráfico de ganancias
function drawProfitChart(data) {
    const profitData = new google.visualization.DataTable();
    profitData.addColumn('string', 'Postre');
    profitData.addColumn('number', 'Ganancia');

    // Agregar ganancias
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
