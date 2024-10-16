window.addEventListener("DOMContentLoaded", (event) => {
alert("Bienvenido a Azucar Al gusto");
  // Función general para obtener datos de la hoja y graficar
  const generateChart = ({sheetID, sheetName, query, chartType, elementID, dateColumn, valueColumn, chartTitle, customFirstColumn = "none", groupby = "no"}) => {

    const sheetDataHandler = (sheetData) => {
      console.log("Datos recibidos: ", sheetData);

      // Cargar las librerías necesarias dependiendo del tipo de gráfico
      google.charts.load('current', {'packages': ['sankey', 'corechart', 'bar', 'calendar', 'Column']});
      google.charts.setOnLoadCallback(() => drawChart(chartType, sheetData));

      // Mapea los datos para usar la columna personalizada o la columna de fecha
      const mappedData = sheetData.map(row => ({
        FirstColumn: customFirstColumn !== "none" ? row[customFirstColumn] : new Date(row[dateColumn]),  // Columna personalizada o fecha
        Value: parseFloat(row[valueColumn])  // Columna de valor numérico
      }));

      // Agrupar valores si el argumento groupby es "yes"
      let groupedData = {};

      if (groupby === "yes") {
        mappedData.forEach(row => {
          const key = customFirstColumn !== "none" ? row.FirstColumn : row.FirstColumn.toDateString(); // Agrupar por la columna correspondiente
          if (!groupedData[key]) {
            groupedData[key] = 0;
          }
          groupedData[key] += row.Value;
        });
        mappedData.length = 0; // Limpiar el arreglo original
        for (let key in groupedData) {
          mappedData.push({ FirstColumn: key, Value: groupedData[key] });
        }
      }

      // Verificamos si los datos mapeados son válidos
      if (mappedData.length > 0 && mappedData[0].FirstColumn && !isNaN(mappedData[0].Value)) {
        const dataTable = new google.visualization.DataTable();
        
        // Si customFirstColumn tiene valor, usamos una columna no de fecha
        if (customFirstColumn !== "none") {
          dataTable.addColumn({ type: 'string', id: 'FirstColumn' });  // Primera columna personalizada (no fecha)
        } else {
          dataTable.addColumn({ type: 'date', id: 'Date' });  // Columna de fecha
        }

        dataTable.addColumn({ type: 'number', id: 'Value' });

        // Poblar DataTable con datos mapeados
        mappedData.forEach(row => {
          if (row.FirstColumn && row.Value) {
            dataTable.addRow([row.FirstColumn, row.Value]);
          }
        });

        drawChart(chartType, dataTable, elementID, chartTitle);
      } else {
        console.error("Los datos mapeados no contienen las columnas esperadas.");
      }
    };

    // Llamada para obtener datos de la hoja de Google Sheets
    getSheetData({
      sheetID,
      sheetName,
      query,
      callback: sheetDataHandler
    });
  };

  // Función para dibujar diferentes tipos de gráficos
  const drawChart = (chartType, dataTable, elementID, chartTitle) => {
    let chart;
    const options = {
      title: chartTitle || "Gráfico Generado",  // Usa el título proporcionado o uno predeterminado
      height: 350
    };

    switch (chartType) {
      case 'calendar':
        chart = new google.visualization.Calendar(document.getElementById(elementID));
        break;
      case 'bar':
        chart = new google.visualization.BarChart(document.getElementById(elementID));
        break;
      case 'line':
        chart = new google.visualization.LineChart(document.getElementById(elementID));
        break;
      case 'sankey':
        chart = new google.visualization.Sankey(document.getElementById(elementID));
        break;
      case 'corechart':
        chart = new google.visualization.PieChart(document.getElementById(elementID));
        break;
      case 'column':
        chart = new google.visualization.ColumnChart(document.getElementById(elementID));
        break;
      default:
        console.error("Tipo de gráfico no reconocido.");
        return;
    }

    chart.draw(dataTable, options);
  };

  // Ejemplo de llamada para generar un gráfico
  generateChart({
    sheetID: "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU",
    sheetName: "Ventas",
    query: "SELECT C, F",
    chartType: "bar",  // Puedes cambiar a 'bar', 'line', 'sankey'
    elementID: 'p2Chart',  // ID del div donde se mostrará el gráfico
    customFirstColumn: 'Postre Vendido',  // Nombre de la columna con fechas
    valueColumn: 'Ganancia',  // Nombre de la columna con valores numéricos
    chartTitle: "$ / T",  // Título personalizado del gráfico
    groupby: "yes"  // Agrupar los valores por fecha
  });
  
  generateChart({
    sheetID: "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU",
    sheetName: "Ventas",
    query: "SELECT C, F",
    chartType: "corechart",  // Puedes cambiar a 'bar', 'line', 'sankey'
    elementID: 'p4Chart',  // ID del div donde se mostrará el gráfico
    customFirstColumn: 'Postre Vendido',  // Nombre de la columna con fechas
    valueColumn: 'Ganancia',  // Nombre de la columna con valores numéricos
    chartTitle: "$ / %",  // Título personalizado del gráfico
    groupby: "yes"  // No agrupar los valores
  });
  
    generateChart({
    sheetID: "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU",
    sheetName: "Ventas",
    query: "SELECT B, D",
    chartType: "line",  // Puedes cambiar a 'bar', 'line', 'sankey'
    elementID: 'p3Chart',  // ID del div donde se mostrará el gráfico
    customFirstColumn: 'Dia',  // Nombre de la columna con fechas
    valueColumn: 'Precio',  // Nombre de la columna con valores numéricos
    chartTitle: "Dia / $",  // Título personalizado del gráfico
    groupby: "yes"  // No agrupar los valores
  });
  
    generateChart({
    sheetID: "17SZ8KjBhX-NmU0sdffXtK-GA_uvM9Ctzec2q4y84QVU",
    sheetName: "Ventas",
    query: "SELECT A, D",
    chartType: "calendar",  // Puedes cambiar a 'bar', 'line', 'sankey'
    elementID: 'p5Chart',  // ID del div donde se mostrará el gráfico
    dateColumn: 'Date',  // Nombre de la columna con fechas
    valueColumn: 'Precio',  // Nombre de la columna con valores numéricos
    chartTitle: "$ / Dia",  // Título personalizado del gráfico
    groupby: "no"  // Agrupar los valores por fecha
  });

});

