var resizeId;d3.select(window).on("resize",function(){resizeId=setTimeout(function(){d3.selectAll(".line_chart").each(function(t,e){d3.select(this);var a=d3.select("#body").node().offsetWidth-margin.left-margin.right,s=parseInt(this.dataset.height)-margin.top-margin.bottom;drawGraph(this,dataForGraphs[e],totalForGraphs[e],a,s,this.dataset.accent,d3.select(this.firstChild),bisectors[e],this.dataset.x,this.dataset.y,this.dataset.scatter,numLinesGraphs[e],colorsForGraphs[e],this.dataset.shade)})},500)});var margin={top:20,right:20,bottom:50,left:50},graphLength=d3.selectAll(".line_chart").size(),dataForGraphs=new Array(graphLength),totalForGraphs=new Array(graphLength),bisectors=new Array(graphLength),colorsForGraphs=new Array(graphLength),numLinesGraphs=new Array(graphLength);function drawGraph(t,e,a,s,r,n,i,o,l,d,h,p,c,f){var g,m=d3.scalePoint().rangeRound([0,s]).padding(.1),u=d3.scaleLinear().rangeRound([r,0]);thisNode=d3.select(t);for(var y,x=[],v=0;v<p;v++)y=d3.line().x(function(t){return m(t.x)}).y(function(t){return u(t.y[v])}),x.push(y);thisNode.select("svg").selectAll("*").remove(),m.domain(e.map(function(t){return""+t.x})),u.domain([0,d3.max(e,function(t){return d3.max(t.y)})]),m.invert=d3.scaleQuantize().domain(m.range()).range(m.domain());var b=thisNode.select("svg").attr("width",s+margin.left+margin.right).attr("height",r+margin.top+margin.bottom).on("mousemove",function(){for(var s,r=m.invert(d3.mouse(this)[0]),n=0;n<e.length;n++)if(e[n].x==r){s=e[n-1];break}g=p>1?generateTooltipMultiline({title:s.x,responses:s.y,colors:c,total:a,labels:t.dataset.labels.split(",")}):generateTooltip({title:s.x,responses:s.y,percentage:s.y/a}),i.classed("hidden",!1).html(g),i.style("left",m(s.x)+margin.left-Math.round(i.node().offsetWidth/2)+"px").style("top",u(d3.max(s.y))-Math.round(i.node().offsetHeight)-12+margin.top+"px")}).on("mouseout",function(t){var e=d3.event.toElement;e&&e.parentNode.parentNode!=this.parentNode&&e.parentNode!=this.parentNode&&e!=this.parentNode&&i.classed("hidden",!0)}).append("g").attr("transform","translate("+margin.left+","+margin.top+")");for(v=0;v<p;v++)b.append("path").data([e]).attr("class","line").style("stroke",c[v]).style("stroke-width","2px").style("fill","none").attr("d",x[v]);b.append("g").style("font-family","IBM_Plex_Sans").style("font-size","14px").attr("transform","translate(0,"+r+")").call(d3.axisBottom(d3.scalePoint().domain([-1,0,1]).rangeRound([0,s]))),b.append("g").style("font-family","IBM_Plex_Sans").style("font-size","14px").call(d3.axisLeft(u).ticks(5)),b.append("text").attr("transform","rotate(-90)").attr("y",0-margin.left).attr("x",0-r/2).attr("dy","1em").style("text-anchor","middle").style("font-family","IBM_Plex_Sans").style("font-size","14px").style("font-weight","bold").text(d),b.append("text").attr("transform","translate("+s/2+" ,"+(r+margin.top+20)+")").style("text-anchor","middle").style("font-family","IBM_Plex_Sans").style("font-size","14px").style("font-weight","bold").text(l)}d3.selectAll(".line_chart").each(function(t,e){var a=this.dataset.accent,s=a.split(","),r=d3.select(this),n=this,i=this.dataset.csv,o=this.dataset.x,l=this.dataset.y,d=d3.select(this.firstChild),h=this.dataset.lines,p=this,c=[],f=0;$.ajax({url:i,success:function(t){t.split("\n").map(function(t){var e=t.split(",");e[0]&&(f+=parseFloat(e[1]),c.push({x:e[0],y:e.slice(1).map(function(t){return parseFloat(t)})}))});var i=d3.bisector(function(t){return t.x}).right;dataForGraphs[e]=c,totalForGraphs[e]=f,bisectors[e]=i,numLinesGraphs[e]=h,colorsForGraphs[e]=s;var g=d3.select("#body").node().offsetWidth-margin.left-margin.right,m=parseInt(n.dataset.height)-margin.top-margin.bottom;if(r.append("svg"),drawGraph(p,c,f,g,m,a,d,i,o,l,n.dataset.scatter,h,s,n.dataset.shade),h>1){var u=n.dataset.labels.split(",");d3.select(n).append("div").attr("class","line-label").attr("width","100%").style("font-size","14px").selectAll("p").data(s).enter().append("p").html(function(t,e){return"<div class = 'bubble' style = 'background:"+t+"'></div> "+u[e]})}},dataType:"text"})});