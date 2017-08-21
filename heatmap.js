var margin = { top: 50, right: 0, bottom: 100, left: 30 },
          width = 435 - margin.left - margin.right,
          height = 936 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 15),
          legendElementWidth = gridSize*3,
          buckets2 = 9,
          colors2 = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          topics = ["wiretap","russia_investigation","media_attacks","empty_positions","secret_waivers","nunes_recuses",
          "tillerson_limited_media","ivanka_employee","flynn_immunity","sessions_recuses","pruitt_EPA","two_state_solution",
          "russia_relations_switch","american_healthcare_act","non-nuclear_bomb_afghanistan","nato_switch","aggressive_north_korea",
          "increase_military_spending","syria_switch","syria_strikes","tax_reductions","climate_order","aircraft_carrier_mistake",
          "mar-a-lago","turkey_president","visitor_logs","chinese_currency_switch","witch_hunt"];
          outlets = ["CNN","Fox","NYT","Wapo","WSJ","USA"];
          datasets = ["data.csv"];

      var svg2 = d3.select("#chart2").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var topicLabels = svg2.selectAll(".topicLabel")
          .data(topics)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", "topicLabel axis");

      var outletLabels = svg2.selectAll(".outletLabel")
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
          var colorScale = d3.scaleQuantile()
              .domain([0, buckets2 - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors2);

          var cards = svg2.selectAll(".hour")
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
              .style("fill", colors2[0]);

          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

          cards.select("title").text(function(d) { return d.value; });

          cards.exit().remove();

        });
      };

      heatmapChart(datasets[0]);
