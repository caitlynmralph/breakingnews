var margin = { top: 50, right: 0, bottom: 100, left: 30 },
    width = 435 - margin.left - margin.right,
    height = 936 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 15),
    legendElementWidth = gridSize*3,
    buckets = 2,
    colors = ["black","white"]; // alternatively colorbrewer.YlGnBu[9]
    topics = ["wiretap","russia_investigation","media_attacks","empty_positions","secret_waivers","nunes_recuses",
    "tillerson_limited_media","ivanka_employee","flynn_immunity","sessions_recuses","pruitt_EPA","two_state_solution",
    "russia_relations_switch","american_healthcare_act","non-nuclear_bomb_afghanistan","nato_switch","aggressive_north_korea",
    "increase_military_spending","syria_switch","syria_strikes","tax_reductions","climate_order","aircraft_carrier_mistake",
    "mar-a-lago","turkey_president","visitor_logs","chinese_currency_switch","witch_hunt"];
    outlets = ["CNN","Fox","NYT","Wapo","WSJ","USA"];
    datasets = ["data.csv"];

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var topicLabels = svg.selectAll(".topicLabel")
    .data(topics)
    .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", 0)
      .attr("y", function (d, i) { return i * gridSize; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
      .attr("class", "topicLabel axis");

var outletLabels = svg.selectAll(".outletLabel")
    .data(outlets)
    .enter().append("text")
      .text(function(d) { return d; })
      .attr("x", function(d, i) { return i * gridSize; })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)")
      .attr("class", "outletLabel axis");

var heatmapChart = function(csvFile) {
  d3.csv(csvFile,
  function(d) {
    return {
      topic: +d.topic,
      outlet: +d.outlet,
      value: +d.value
    };
  },
  function(error, data) {
    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
        .range(colors);

    var cards = svg.selectAll(".hour")
        .data(data, function(d) {return d.topic+':'+d.outlet;});

    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.outlet - 1) * gridSize; })
        .attr("y", function(d) { return (d.topic - 1) * gridSize; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "outlet bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", function(d) {
          if (d.value == 0) {
            return "white";
          }
          else {
            return "black";
          }
        });

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d; });

    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .attr("class","bordered")
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "axis")
      .text(function(d) {
        console.log(d)
        if (d == 0) {
          return "Sent alert";
        }
        else {
          return "Didn't send alert";
        }})
      .attr("x", function(d, i) { return legendElementWidth * i; })
      .attr("y", height + gridSize);

  });
};

heatmapChart(datasets[0]);
