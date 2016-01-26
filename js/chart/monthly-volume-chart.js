'use strict';

var volumeChart = dc.barChart('#monthly-volume-chart');

//d3.json('data.json', function(data) {...};
d3.csv('../../js/chart/data.csv', function (data) {
    var dateFormat = d3.time.format('%m/%d/%Y');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd);
        d.close = +d.close;
        d.open = +d.open;
    });

    var ndx = crossfilter(data);

    var moveMonths = ndx.dimension(function (d) {
        return d.month;
    });

    var mindate = data[0].date
    var maxdate = data[data.length - 4000].date

    //del
    var selectdateSt = data[data.length - 5000].date
    var selectdateEn = data[data.length - 5500].date

    var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
        return d.volume / 500000;
    });

    var barTip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
        })

    var volumeChartWidth = document.getElementById("monthly-volume-chart").clientWidth;

    volumeChart.width(volumeChartWidth) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(110)
        .margins({top: 0, right: 0, bottom: 24, left: 0})
        .dimension(moveMonths)
        .group(volumeByMonthGroup)
        .x(d3.time.scale().domain([new Date(mindate), new Date(maxdate)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months)
        .filter(dc.filters.RangedFilter(new Date(selectdateSt), new Date(selectdateEn)))
        .title(function(d){
            return d.dd + "Number of Events: "
        })
        .on('pretransition', function(volumeChart) {
            /*volumeChart.select(".brush")
                .attr("transform", "translate(0,97)").attr("height", "34px").attr("overflow", "hidden")
            volumeChart.select(".background")
                .attr("y", "-2").attr("height", "16").attr("style", "visibility: visible; cursor: crosshair;")
            volumeChart.select(".extent")
                .attr("height", "2")
            volumeChart.select(".resize.w rect")
                .attr("x", "0").attr("width", "10").attr("height", "34")
            volumeChart.select(".resize.w path")
                .attr("transform", "translate(0,-9), scale(1, 0.3)")
            volumeChart.select(".resize.w rect")
                .attr("height", "10")

            volumeChart.select(".resize.e rect")
                .attr("x", "0").attr("width", "10").attr("height", "34")
            volumeChart.select(".resize.e path")
                .attr("transform", "translate(0,-9), scale(1, 0.3)")
            volumeChart.select(".resize.e rect")
                .attr("height", "10")*/
            /*volumeChart.select(".resize.e rect")
                .attr("x", "0").attr("width", "10").attr("height", "34")
            volumeChart.select(".resize.e path")
                .attr("transform", "translate(0,-10)")
            volumeChart.select(".resize.e path")
                .attr("d", "M 5,5 L 0,18 L 0,36 L 10,36 L 10,18 L 10,18 Z")*/
        })
        .on('renderlet', function(chart) {
            chart.selectAll('rect').on("click", function(d) {
                console.log("click!", d);
            });
        });

    dc.renderAll();

    d3.selectAll(".bar").call(barTip);
    d3.selectAll(".bar").on('mouseover', barTip.show)
        .on('mouseout', barTip.hide);

    d3.select(window).on('resize', resize);

    function resize() {
        var newWidth = document.getElementById("monthly-volume-chart").offsetWidth;
        volumeChart.width(newWidth)
            .transitionDuration(0);
        dc.renderAll();
        volumeChart.transitionDuration(750);
    }

});

