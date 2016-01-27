'use strict';

var gainOrLossChart = dc.pieChart('#pie-chart');

//d3.json('data.json', function(data) {...};
d3.csv('../../js/chart/data.csv', function (data) {
    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd);
        d.close = +d.close;
        d.open = +d.open;
    });

    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    var gainOrLoss = ndx.dimension(function (d) {
        var day = d.dd.getDay();
        var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return day + '.' + name[day];
    });
    var gainOrLossGroup = gainOrLoss.group();

    var pieTip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
        })

    var pieChartWidth  = document.getElementById("pie-chart").clientWidth;

    gainOrLossChart /* dc.pieChart('#gain-loss-chart', 'chartGroup') */
        .width(pieChartWidth)
        .height(pieChartWidth)
        .radius(pieChartWidth/4)
        .innerRadius(pieChartWidth/4.9)
        .slicesCap(3)
        .externalLabels(70)
        .externalRadiusPadding(0)
        .drawPaths(true)
        .dimension(gainOrLoss)
        .group(gainOrLossGroup)
        //.legend(dc.legend())
        .label(function (d) {
            if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
                return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        })
    ;


    dc.renderAll();

    d3.selectAll(".pie-slice").call(pieTip);
    d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
        .on('mouseout', pieTip.hide);

    d3.select(window).on('resize', resize);

    function resize() {
        var newWidth = document.getElementById("pie-chart").offsetWidth;
        gainOrLossChart.width(newWidth)
        .height(newWidth)
        .radius(newWidth/3)
        dc.renderAll();
        gainOrLossChart.transitionDuration(750);
    }

});

