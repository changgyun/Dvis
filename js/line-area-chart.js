'use strict';

var moveChart = dc.lineChart('#monthly-move-chart');

//d3.json('data.json', function(data) {...};
d3.csv('../js/ndx.csv', function (data) {
    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');

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

    var indexAvgByMonthGroup = moveMonths.group().reduce(
        function (p, v) {
            ++p.days;
            p.total += (v.open + v.close) / 2;
            p.avg = Math.round(p.total / p.days);
            return p;
        },
        function (p, v) {
            --p.days;
            p.total -= (v.open + v.close) / 2;
            p.avg = p.days ? Math.round(p.total / p.days) : 0;
            return p;
        },
        function () {
            return {days: 0, total: 0, avg: 0};
        }
    );

    var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
        return Math.abs(d.close - d.open);
    });

    var mindate = data[0].date
    var maxdate = data[data.length - 1].date

    var lineTip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
        })

    var moveChartWidth  = document.getElementById("monthly-move-chart").clientWidth;

    moveChart /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
        .renderArea(true)
        .width(moveChartWidth)
        .height(300)
        .transitionDuration(1000)
        .margins({top: 20, right: 6, bottom: 20, left: 20})
        .dimension(moveMonths)
        .mouseZoomable(true)
        .rangeChart(moveChart)
        .x(d3.time.scale().domain([new Date(mindate), new Date(maxdate)]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(moveChartWidth-100).y(10).itemHeight(13).gap(5))
        .brushOn(false)
        .group(indexAvgByMonthGroup, 'color Type01')
        .valueAccessor(function (d) {
            return d.value.avg;
        })
        .stack(monthlyMoveGroup, 'color Type02', function (d) {
            return d.value;
        })
        .stack(monthlyMoveGroup, 'color Type03', function (d) {
            return d.value;
        })
        .stack(monthlyMoveGroup, 'color Type04', function (d) {
            return d.value;
        })
        .title(function (d) {
            var value = d.value.avg ? d.value.avg : d.value;
            if (isNaN(value)) {
                value = 0;
            }
            return dateFormat(d.key) + '\n' + numberFormat(value);
        });

    dc.renderAll();

    d3.selectAll(".dot").call(lineTip);
    d3.selectAll(".dot").on('mouseover', lineTip.show);
    d3.selectAll(".dc-tooltip-list").on('mouseout', lineTip.hide);

    d3.select(window).on('resize', resize);

    function resize() {
        var newWidth = document.getElementById("monthly-move-chart").offsetWidth;
        moveChart.width(newWidth)
            .transitionDuration(0)
            .legend(dc.legend().x(newWidth-100).y(10).itemHeight(13).gap(5));
        dc.renderAll();
        moveChart.transitionDuration(750);
    }
});

