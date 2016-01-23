var sentimentChart = dc.seriesChart("#sentiment-line-chart");
var ndx, runDimension, runGroup;

d3.csv("../js/morcy.csv", function(error, experiments) {

    ndx = crossfilter(experiments);
    runDimension = ndx.dimension(function(d) {return [+d.Expt, +d.Run]; });
    runGroup = runDimension.group().reduceSum(function(d) { return +d.Speed; });

    sentimentChart
        .width(768)
        .height(480)
        .chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
        .x(d3.scale.linear().domain([0,20]))
        .brushOn(false)
        .yAxisLabel("Measured Speed km/s")
        .xAxisLabel("Run")
        .clipPadding(10)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .dimension(runDimension)
        .group(runGroup)
        .mouseZoomable(true)
        .seriesAccessor(function(d) {return "Expt: " + d.key[0];})
        .keyAccessor(function(d) {return +d.key[1];})
        .valueAccessor(function(d) {return +d.value - 500;})
        .legend(dc.legend().x(350).y(350).itemHeight(13).gap(5).horizontal(1).legendWidth(140).itemWidth(70));
    sentimentChart.yAxis().tickFormat(function(d) {return d3.format(',d')(d+299500);});
    sentimentChart.margins().left += 40;

    dc.renderAll();

});

function load_button(file) {
    return function load_it() {
        d3.csv(file, function(error, experiments) {
            ndx.remove();
            ndx.add(experiments);
            dc.redrawAll();
        });
    };
}

var button1 = load_button("morley.csv"),
    button2 = load_button("morley2.csv"),
    button3 = load_button("morley3.csv");



////////////////////////////////////////////////////////////////////////////////////////////////////


var data = [
    {Id: "01", Name: "Red", Price: "1.00", Quantity: "1",TimeStamp:111},
    {Id: "04", Name: "Blue", Price: "9.50", Quantity: "8",TimeStamp:434},
    {Id: "05",Name: "Blue", Price: "1.20", Quantity: "1",TimeStamp:777}
];


var color = d3.scale.category20();

var chart = d3.select("#sentiment-chart")

var bar = chart.selectAll("div")
    .data(data)
    .enter().append("div")
    .attr('data-tooltip',function(d,i){ return d.Name} )
    .attr('style',function(d,i){
        return (
        'flex:' + d.Quantity + '; '
        + 'background:' + color(i) + ';'
        )
    })
    .append("div")
    .attr('style',function(d,i){
        return (
        'margin-top:40px;text-align:center'
        )
    })
    .text(function(d){
        return (
            "ok 10%"
        )
    })
    .on("click",function(d,i){
        //updateElements(data)
        d3.select("#rowChart")
            .selectAll("div")
            .attr("class", function(e, j) { return j != i ? "deselected" : "selected";
            });
    })

