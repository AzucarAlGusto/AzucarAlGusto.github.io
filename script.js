// Google Sheet ID and sheet name
const sheetId = "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU";
const sheetName = encodeURIComponent("Ventas");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
alert("Hecho por Nelson Fabrizio Cáceres Ruz, Actividad 8 UVM");

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
        
        // Call the function to generate the postres vendidos table
        generatePostresTable(data);
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

google.charts.load('current', {'packages':['sankey','corechart', 'bar', 'calendar']});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
	drawChartP2();
	drawChartP3();
	drawChartP4();
	drawChartP5();
	}


function drawChartP2() {
	var data = google.visualization.arrayToDataTable([
		['Postre', 'Ganancias'],
		['Helado', 1240],
		['Cheesecake', 860],
		['Pastel', 750],
		['Tarta', 720],
		['Brownie', 675],
		['Mousse', 450],
		['Pay', 344],
		]);

	var chart = new google.visualization.BarChart(document.getElementById('p2Chart'));
	chart.draw(data, {
		backgroundColor:'transparent',
		legend: 'bottom'
		});
	}

function drawChartP3() {
	 var data = google.visualization.arrayToDataTable([
		['Dia', 'Ventas'],
		['Lunes', 48],
		['Martes', 56],
		['Miercoles', 61],
		['Jueves', 44],
		['Viernes', 100],
		['Sabado', 91]
	      ]);

	 var chart = new google.visualization.AreaChart(document.getElementById('p3Chart'));
	 chart.draw(data,  {
		backgroundColor:'transparent',
		legend: 'bottom'
		});
	}

function drawChartP4() {
	var data = google.visualization.arrayToDataTable([
		['Postre', 'Ganancias'],
		['Brownie', 675],
		['Galletas', 190],
		['Pastel de Chocolate', 750],
		['Cheesecake', 860],
		['Mousse de Fresa', 450],
		['Pay de Limón', 344],
		['Gelatina', 44],
		['Tarta de Manzana', 720],
		['Helado', 1240],
		['Cupcake de Vainilla', 160]
		]);

	var chart = new google.visualization.PieChart(document.getElementById('p4Chart'));
	chart.draw(data, {
		backgroundColor:'transparent',
		legend: 'bottom'
		});
	}

function drawChartP5() {
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn({ type: 'date', id: 'Fecha' });
	dataTable.addColumn({ type: 'number', id: 'Ganancias' });
	dataTable.addRows([	  
[ new Date(2024, 1, 1), 15],
[ new Date(2024, 1, 2), 20],
[ new Date(2024, 1, 3), 35],
[ new Date(2024, 1, 4), 15],
[ new Date(2024, 1, 5), 30],
[ new Date(2024, 1, 6), 10],
[ new Date(2024, 1, 8), 20],
[ new Date(2024, 1, 10), 30],
[ new Date(2024, 1, 12), 10],
[ new Date(2024, 1, 13), 25],
[ new Date(2024, 1, 15), 25],
[ new Date(2024, 1, 17), 20],
[ new Date(2024, 1, 18), 35],
[ new Date(2024, 1, 19), 25],
[ new Date(2024, 1, 20), 60],
[ new Date(2024, 1, 23), 10],
[ new Date(2024, 1, 24), 5],
[ new Date(2024, 1, 25), 15],
[ new Date(2024, 1, 26), 68],
[ new Date(2024, 1, 27), 15],
[ new Date(2024, 1, 29), 15],
[ new Date(2024, 1, 31), 35],
[ new Date(2024, 2, 1), 35],
[ new Date(2024, 2, 2), 15],
[ new Date(2024, 2, 3), 22],
[ new Date(2024, 2, 5), 15],
[ new Date(2024, 2, 6), 10],
[ new Date(2024, 2, 8), 25],
[ new Date(2024, 2, 9), 25],
[ new Date(2024, 2, 10), 25],
[ new Date(2024, 2, 12), 52],
[ new Date(2024, 2, 14), 20],
[ new Date(2024, 2, 15), 35],
[ new Date(2024, 2, 16), 15],
[ new Date(2024, 2, 17), 5],
[ new Date(2024, 2, 20), 30],
[ new Date(2024, 2, 21), 45],
[ new Date(2024, 2, 22), 15],
[ new Date(2024, 2, 23), 22],
[ new Date(2024, 2, 24), 25],
[ new Date(2024, 2, 26), 15],
[ new Date(2024, 2, 27), 35],
[ new Date(2024, 2, 28), 23],
[ new Date(2024, 3, 1), 15],
[ new Date(2024, 3, 2), 10],
[ new Date(2024, 3, 4), 28],
[ new Date(2024, 3, 6), 15],
[ new Date(2024, 3, 7), 10],
[ new Date(2024, 3, 8), 66],
[ new Date(2024, 3, 9), 50],
[ new Date(2024, 3, 11), 35],
[ new Date(2024, 3, 12), 37],
[ new Date(2024, 3, 13), 30],
[ new Date(2024, 3, 14), 15],
[ new Date(2024, 3, 15), 30],
[ new Date(2024, 3, 16), 20],
[ new Date(2024, 3, 18), 40],
[ new Date(2024, 3, 19), 30],
[ new Date(2024, 3, 21), 2],
[ new Date(2024, 3, 22), 40],
[ new Date(2024, 3, 23), 88],
[ new Date(2024, 3, 25), 20],
[ new Date(2024, 3, 26), 10],
[ new Date(2024, 3, 27), 20],
[ new Date(2024, 3, 29), 50],
[ new Date(2024, 3, 30), 50],
[ new Date(2024, 4, 2), 10],
[ new Date(2024, 4, 4), 10],
[ new Date(2024, 4, 5), 25],
[ new Date(2024, 4, 6), 35],
[ new Date(2024, 4, 9), 15],
[ new Date(2024, 4, 10), 20],
[ new Date(2024, 4, 12), 50],
[ new Date(2024, 4, 13), 45],
[ new Date(2024, 4, 15), 20],
[ new Date(2024, 4, 16), 2],
[ new Date(2024, 4, 17), 20],
[ new Date(2024, 4, 18), 15],
[ new Date(2024, 4, 19), 20],
[ new Date(2024, 4, 20), 40],
[ new Date(2024, 4, 22), 5],
[ new Date(2024, 4, 24), 35],
[ new Date(2024, 4, 26), 61],
[ new Date(2024, 4, 27), 48],
[ new Date(2024, 4, 30), 38],
[ new Date(2024, 5, 1), 58],
[ new Date(2024, 5, 3), 8],
[ new Date(2024, 5, 4), 35],
[ new Date(2024, 5, 6), 35],
[ new Date(2024, 5, 7), 40],
[ new Date(2024, 5, 9), 20],
[ new Date(2024, 5, 10), 28],
[ new Date(2024, 5, 11), 10],
[ new Date(2024, 5, 13), 20],
[ new Date(2024, 5, 14), 40],
[ new Date(2024, 5, 15), 10],
[ new Date(2024, 5, 16), 28],
[ new Date(2024, 5, 18), 78],
[ new Date(2024, 5, 20), 28],
[ new Date(2024, 5, 22), 30],
[ new Date(2024, 5, 23), 30],
[ new Date(2024, 5, 24), 126],
[ new Date(2024, 5, 25), 20],
[ new Date(2024, 5, 28), 20],
[ new Date(2024, 5, 29), 18],
[ new Date(2024, 5, 30), 8],
[ new Date(2024, 5, 31), 13],
[ new Date(2024, 6, 3), 2],
[ new Date(2024, 6, 4), 10],
[ new Date(2024, 6, 7), 40],
[ new Date(2024, 6, 8), 35],
[ new Date(2024, 6, 10), 10],
[ new Date(2024, 6, 11), 37],
[ new Date(2024, 6, 12), 33],
[ new Date(2024, 6, 13), 2],
[ new Date(2024, 6, 14), 20],
[ new Date(2024, 6, 15), 33],
[ new Date(2024, 6, 18), 28],
[ new Date(2024, 6, 19), 20],
[ new Date(2024, 6, 21), 70],
[ new Date(2024, 6, 24), 8],
[ new Date(2024, 6, 25), 30],
[ new Date(2024, 6, 26), 10],
[ new Date(2024, 6, 27), 8],
[ new Date(2024, 6, 28), 80],
[ new Date(2024, 6, 29), 28],
[ new Date(2024, 7, 2), 5],
[ new Date(2024, 7, 3), 37],
[ new Date(2024, 7, 4), 10],
[ new Date(2024, 7, 5), 15],
[ new Date(2024, 7, 6), 20],
[ new Date(2024, 7, 8), 40],
[ new Date(2024, 7, 9), 16],
[ new Date(2024, 7, 10), 28],
[ new Date(2024, 7, 11), 25],
[ new Date(2024, 7, 12), 10],
[ new Date(2024, 7, 13), 25],
[ new Date(2024, 7, 15), 30],
[ new Date(2024, 7, 16), 50],
[ new Date(2024, 7, 18), 50],
[ new Date(2024, 7, 19), 25],
[ new Date(2024, 7, 20), 20],
[ new Date(2024, 7, 22), 20],
[ new Date(2024, 7, 23), 45],
[ new Date(2024, 7, 26), 62],
[ new Date(2024, 7, 29), 40],
[ new Date(2024, 7, 30), 20],
[ new Date(2024, 7, 31), 35],
[ new Date(2024, 8, 1), 5],
[ new Date(2024, 8, 2), 25],
[ new Date(2024, 8, 3), 31],
[ new Date(2024, 8, 5), 20],
[ new Date(2024, 8, 6), 10],
[ new Date(2024, 8, 8), 20],
[ new Date(2024, 8, 9), 50],
[ new Date(2024, 8, 10), 62],
[ new Date(2024, 8, 12), 15],
[ new Date(2024, 8, 13), 20],
[ new Date(2024, 8, 14), 50],
[ new Date(2024, 8, 15), 15],
[ new Date(2024, 8, 16), 15],
[ new Date(2024, 8, 17), 21],
[ new Date(2024, 8, 21), 15],
[ new Date(2024, 8, 23), 35],
[ new Date(2024, 8, 24), 20],
[ new Date(2024, 8, 26), 40],
[ new Date(2024, 8, 27), 25],
[ new Date(2024, 8, 28), 20],
[ new Date(2024, 8, 29), 20],
[ new Date(2024, 8, 30), 25],
[ new Date(2024, 8, 31), 4],
[ new Date(2024, 9, 2), 53],
[ new Date(2024, 9, 4), 25],
[ new Date(2024, 9, 5), 15],
[ new Date(2024, 9, 6), 25],
[ new Date(2024, 9, 7), 37],
[ new Date(2024, 9, 9), 20],
[ new Date(2024, 9, 10), 15],
[ new Date(2024, 9, 11), 18],
[ new Date(2024, 9, 12), 40],
[ new Date(2024, 9, 13), 45],
[ new Date(2024, 9, 14), 30],
[ new Date(2024, 9, 16), 15],
[ new Date(2024, 9, 17), 40],
[ new Date(2024, 9, 18), 20],
[ new Date(2024, 9, 19), 25],
[ new Date(2024, 9, 20), 62],
[ new Date(2024, 9, 21), 58],
[ new Date(2024, 9, 23), 5],
[ new Date(2024, 9, 24), 15],
[ new Date(2024, 9, 25), 20],
[ new Date(2024, 9, 26), 10],
[ new Date(2024, 9, 27), 15],
[ new Date(2024, 9, 28), 70],
[ new Date(2024, 10, 1), 10],
[ new Date(2024, 10, 2), 25],
[ new Date(2024, 10, 3), 20],
[ new Date(2024, 10, 4), 30]		  
		]);

	var chart = new google.visualization.Calendar(document.getElementById('p5Chart'));
        chart.draw(dataTable, { height: 200 });
	}