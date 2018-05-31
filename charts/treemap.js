(function(){

	var tree = raw.models.tree();

	var chart = raw.chart()
        .title('Treemap')
		.description(
            "Un espace remplissant la visualisation des hiérarchies de données et la proportion entre les éléments. Les différents niveaux hiérarchiques créent des clusters visuels à travers la subdivision en rectangles proportionnellement à la valeur de chaque élément. Les Treemaps sont utiles pour représenter la proportion différente de structures de données hiérarchiques imbriquées. <br/> Basé sur <a href='http://bl.ocks.org/mbostock/4063582'> http://bl.ocks.org/ mbostock / 4063582</a>")
		.thumbnail("imgs/treemap.png")
	    .category('Hierarchy (weighted)')
		.model(tree)

	var width = chart.number()
		.title('Width')
		.defaultValue(100)
		.fitToWidth(true)

	var height = chart.number()
		.title("Height")
		.defaultValue(500)

	var padding = chart.number()
		.title("Padding")
		.defaultValue(5)

	var colors = chart.color()
		.title("Color scale")

	chart.draw(function (selection, data){

		var format = d3.format(",d");

		var layout = d3.layout.treemap()
			.sticky(true)
            .padding(+padding())
            .size([+width(), +height()])
            .value(function(d) { return d.size; })

		var g = selection
    	    .attr("width", +width())
    	    .attr("height", +height())
    	  	.append("g")
    	    .attr("transform", "translate(.5,.5)");

		var nodes = layout.nodes(data)
	  	    .filter(function(d) { return !d.children; });

        colors.domain(nodes, function (d){ return d.color; });

		var cell = g.selectAll("g")
    	    .data(nodes)
    	    .enter().append("g")
    	    .attr("class", "cell")
    	    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		cell.append("svg:rect")
    	    .attr("width", function (d) { return d.dx; })
    	    .attr("height", function (d) { return d.dy; })
    	    .style("fill", function (d) { return colors()(d.color); })
    	    .style("fill-opacity", function (d) {  return d.children ? 0 : 1; })
			.style("stroke","#fff")

		cell.append("svg:title")
			.text(function(d) { return d.name + ": " + format(d.size); });

		cell.append("svg:text")
    	    .attr("x", function(d) { return d.dx / 2; })
    	    .attr("y", function(d) { return d.dy / 2; })
    	    .attr("dy", ".35em")
    	    .attr("text-anchor", "middle")
	  //  .attr("fill", function (d) { return raw.foreground(color()(d.color)); })
    	   	.style("font-size","11px")
    		.style("font-family","Arial, Helvetica")
    	    .text(function(d) { return d.label ? d.label.join(", ") : d.name; });

	})
})();
