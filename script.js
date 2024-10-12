// Google Sheet ID y nombre de la hoja
const sheetId = "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU";
const sheetName = encodeURIComponent("Ventas");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

$(document).ready(function() {
    // Cargar los datos del Google Sheet
    $.ajax({
        type: "GET",
        url: sheetURL,
        dataType: "text",
        success: function (response) {
            var data = $.csv.toObjects(response);
            console.log(data);
            
            // Renderizar la tabla y las gráficas
            renderTable(data);
            drawCharts(data);
        },
        error: function (error) {
            console.error("Error al cargar los datos:", error);
        }
    });
});

function renderTable(data) {
    // Renderizar los datos en formato de tabla
    const table = $('#dataTable');
    table.empty(); // Limpiar los datos previos

    // Añadir la fila de encabezado
    table.append('<tr><th>Fecha</th><th>Postre</th><th>Cantidad</th><th>Precio</th></tr>');

    // Añadir cada fila de datos
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
    // Lógica de ejemplo para dibujar una gráfica
    const chartData = google.visualization.arrayToDataTable(data.map(item => [item.Postre, parseInt(item.Cantidad)]));

    const options = {
        title: 'Cantidad de Postres Vendidos',
        pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
}
