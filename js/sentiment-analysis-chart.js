'use strict';

var dayOfWeekChart = dc.rowChart('#sentiment-chart');

//d3.json('data.json', function(data) {...};
d3.csv('../js/sentiment.csv', function (data) {

    data.forEach(function (d) {
        d.sentiment = +d.sentiment;
    });

    var ndx = crossfilter(data);

    var sentimentChartWidth = document.getElementById("sentiment-chart").clientWidth;

    var dayOfWeek = ndx.dimension(function (d) {
        var day = d.sentiment;
        var name = ['Basic Positive', 'Negative', 'Basic Neutral'];
        return day + '.' + name[day];
    });

    var dayOfWeekGroup = dayOfWeek.group();

    dayOfWeekChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
        .width(sentimentChartWidth)
        .height(180)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(dayOfWeekGroup)
        .dimension(dayOfWeek)
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        .label(function (d) {
            return d.key.split('.')[1];
        })
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .xAxis().ticks(4)

    dc.renderAll();

});
