<template>
  <d3directed :nodes="nodes" :links="links"></d3directed>
</template>

<script>
  import d3directed from "./D3-directed"
  export default {
    name: "HopsGraph",
    props: {
      data_url: String,
      condition: Object,
      center_ip: String,
      click_num: Number,
    },
    data: function() {
      return {
        table_data: [],
        nodes: [],
        links: [],
        last_ip: ""
      }
    },
    computed:{

    },
    methods: {
      fetchData() {
        if (this.condition["ip"] === this.last_ip){
          return;
        }else{
          this.last_ip = this.condition["ip"];
        }
        let commit_params = {};
        Object.assign(commit_params, this.condition);
        console.log("commit_params:",commit_params);
        // let url = ( this.data_url.startsWith("/api") || this.data_url.startsWith("/celery") ) ?
        //   this.data_url : ( "/api" + this.data_url );
        let url = this.data_url;
        this.$axios
          .get(url, {
            params: commit_params
          })
          .then(res => {
            // console.log(res.data);
            this.table_data=res.data.data;
            this.compute();
          })
          .catch(err => {
            this.table_data={
              "itemsCount": 0,
              "time": 0,
              "data": []
            }
          })
      },
      compute() {
        let data = this.table_data;
        console.log(data);
        if (!data){
          return;
        }
        let ip_id = {};
        let nodes = [];
        let links = [];
        let degree = {};
        for (let o of data){
          let in_ip = o["in_ip"];
          let out_ip = o["out_ip"];
          let terminal = o["is_dest"];
          if (!(in_ip in ip_id)){
            nodes.push({
              "ip": in_ip,
              "id": nodes.length,
              "class": "",
            });
            ip_id[in_ip] = nodes.length - 1;
            degree[in_ip] = 1;
          }else{
            degree[in_ip] += 1;
          }
          if (!(out_ip in ip_id)){
            nodes.push({
              "ip": out_ip,
              "id": nodes.length,
              "class": terminal,
            });
            ip_id[out_ip] = nodes.length - 1;
            degree[out_ip] = 1;
          }else{
            nodes[ip_id[out_ip]]["class"] = (nodes[ip_id[out_ip]]["class"]) ? nodes[ip_id[out_ip]]["class"] : terminal;
            degree[out_ip] += 1;
          }
          links.push({"source": ip_id[in_ip], "target": ip_id[out_ip], "id": links.length});
        }
        for (let ip in degree){
          nodes[ip_id[ip]]["degree"] = degree[ip];
        }
        nodes[ip_id[this.center_ip]]["class"] = "c";
        this.nodes = nodes;
        this.links = links;
        // console.log(this.nodes, this.links)
      }
    },
    watch: {
      click_num: function () {
        // this.compute();
      },
      condition: function () {
        // console.log("condition:", this.condition);
        this.fetchData();
      }
    },
    mounted() {
      // this.fetchData();
    },
    components: {
      d3directed,
    }
  }
</script>

<style scoped>

</style>