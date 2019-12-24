<template>
  <div id="container_svg">
    <svg id="topo" :width="svg_width" :height="svg_height">

    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: "d3-directed",
    props: {
      links: Array,
      nodes: Array,
    },
    data: function () {
      return {
        svg_width: document.body.clientWidth,
        svg_height: 700,
      }
    },
    computed: {
    },
    methods: {


    },
    watch: {
      nodes: function () {
        draw(this.nodes, this.links, this.svg_width, this.svg_height);
      },
      svg_width: function () {
        resize(this.svg_width, this.svg_height);
      }
    },
    mounted() {
      const svg = d3.select("svg#topo");
      svg.append("text").attr("x", 38).attr("y", 15).text("图例");
      svg.append("circle")
          .attr("r", "10px").attr("fill", circle_color["c"]).attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .attr("cx", 20).attr("cy", 40);
      svg.append("text").attr("x", 40).attr("y", 42.5).text("搜索的点");
      svg.append("circle")
          .attr("r", "10px").attr("fill", circle_color["Y"]).attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .attr("cx", 20).attr("cy", 70);
      svg.append("text").attr("x", 40).attr("y", 72.5).text("末跳主机");
      svg.append("circle")
          .attr("r", "10px").attr("fill", circle_color["N"]).attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .attr("cx", 20).attr("cy", 100);
      svg.append("text").attr("x", 40).attr("y", 102.5).text("路由器节点");
      const _this = this;
      window.onresize = function () {
        _this.svg_width = document.body.clientWidth;
      }
    }

  }

  let drag = simulation => {

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      d.fixed = true;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  let simulation;

  const circle_color= {
    "Y": "#F5DEB3", //终端
    "N": "#87CEFA", //路由器
    "c": "#FFC0CB", // 查询ip
    "": "#ADD8E6"
  };

  function draw(nodes, links, svg_width, svg_height) {
        if (nodes && links){
          console.log("进入draw");
        }else{
          console.log("nodes或links为空");
          return;
        }

        const svg = d3.select("svg#topo");

        svg.selectAll("g").remove();  // 清除画布所有之前绘制的图形

        simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id))
          .force("charge", d3.forceManyBody().strength(-500))
          .force("center", d3.forceCenter(svg_width / 2, svg_height / 2));

        const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", "2px");

        const node = svg.append("g")
          .selectAll("g")
          .data(nodes)
          .join("g")
          .call(drag(simulation));

        node.append("circle")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .attr("r", 12.5)
          .attr("fill", d => circle_color[d.class]);

        node.append("text")
          .attr('dy', '.35em')
          .attr('font-size', '9px')
          .style('text-anchor', 'middle')
          .style('user-select', 'none')
          .style('cursor', 'default')
          .attr('fill', '#333')
          .text(function(d){return d.ip;});

        node.append("title")
          .text(function (d) {
            return "IP : " + d.ip + "\n" +
            "节点度 : " + d.degree;
          });

        simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          node
            .attr("transform", function(d) {
              return "translate(" + d.x + "," + d.y + ")";
            });
        });

        // invalidation.then(() => simulation.stop());
        // return svg.node();
      }

  function resize(svg_width, svg_height) {
    simulation.force("center", d3.forceCenter(svg_width / 2, svg_height / 2));
    simulation.restart();
  }

</script>

<style scoped>

</style>

<style>
  /*.link line {*/
  /*  stroke: #333;*/
  /*  stroke-opacity: 0.6;*/
  /*}*/
  /*!*.node circle {*/
  /*  stroke: #333;*/
  /*  stroke-width: 1px;*/
  /*  stroke-opacity: 0.6;*/
  /*}*!*/
  /*.node{*/
  /*  stroke: #333;*/
  /*  stroke-width: 1px;*/
  /*  stroke-opacity: 0.6;*/
  /*}*/
</style>