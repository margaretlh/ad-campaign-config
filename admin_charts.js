/**
 * Module for chart initialization.
 */

/* global google */

let chartType = null;
let dataArray = null;
let options = null;

/**
 * Draws chart callback function
 */
function drawChart() {
    const data = google.visualization.arrayToDataTable(dataArray);
    let chart = null;

    if (chartType === 'line') {
        const height = 300;
        const chartArea = {
            width: '70%',
            height: '60%',
        };

        options = {
            vAxis: { format: 'decimal' },
            chartArea,
            width: '90%',
            height,
            curveType: 'function',
        };
        chart = new google.visualization.LineChart(
            document.getElementById('google_chart'),
        );
    }

    if (chartType === 'bar') {
        const height = data.getNumberOfRows() * 30 + 50;
        const chartArea = {
            width: '70%',
            height: '80%',
        };

        options = {
            vAxis: { format: 'decimal' },
            chartArea,
            width: '90%',
            height,
        };
        chart = new google.visualization.BarChart(
            document.getElementById('google_chart'),
        );
    }
    chart.draw(data, options);
}

/**
 * Load google chart module and set draw callback
 * @param data - object with chart configs.
 */
function init(data) {
    ({ chartType, dataArray } = data);
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
}

module.exports = {
    init,
};
