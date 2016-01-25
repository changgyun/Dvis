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

