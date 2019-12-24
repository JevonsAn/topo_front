<template>
  <div style="text-align: left">
    <base-button @click="$emit('click')">返回</base-button>
    <div v-for="table in clickTables">
      <div v-if="table === '3hops'">
        <h4 class="sub-header" style="font-size: large" :key="getUrl(table) + 'h4'">
          3Hops邻居
        </h4>
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="3-Hops邻居" name="data">
            <BaseTableWithPager
              :data_url="getUrl(table)"
              :table_head="getHead(table)"
              :extra_condition="getParams(table)"
              :page_name="page_name"
              :key="getUrl(table)"
            ></BaseTableWithPager>
          </el-tab-pane>
          <el-tab-pane label="可视化" name="graph">
            <HopsGraph
              :data_url="getUrl(table)"
              :condition="getParams(table)"
              :center_ip="ip"
              :click_num="clickGraph"
            ></HopsGraph>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-else>
        <h4 class="sub-header" style="font-size: large" :key="getUrl(table) + 'h4'">
          {{ getTitle(table) }}
        </h4>
        <BaseTableWithPager
          :data_url="getUrl(table)"
          :table_head="getHead(table)"
          :extra_condition="getParams(table)"
          :page_name="page_name"
          :key="getUrl(table)"
        ></BaseTableWithPager>
      </div>
      <br :key="getUrl(table) + 'br'"/>
      <HR :key="getUrl(table) + 'HR'"></HR>
    </div>
  </div>
</template>


<script>
  import clickConfig from "../assets/clickTable"
  import HopsGraph from "./base/3HopsGraph";
  export default {
    components: {HopsGraph},
    props:{
      action:{
        type:String,
        required:true
      },
      type:{
        type:String,
        required:true
      },
      ip: {
        type:String,
        required:true
      },
      out_ip: {
        type:String,
        required:false
      },
      display:{
        type:String,
        required:false
      }
    },
    data() {
      return {
        clickBaseTables: clickConfig.clickTables,
        page_name: "ipClick",
        activeName: "data",
        clickGraph: 0
      };
    },
    computed: {
      clickTables: function () {
        let tables = clickConfig.clickPageTables(this.action, this.type);
        // console.log(tables);

        // if (!tables.length) {
        //   console.log("====")
        //   this.$emit('click');
        // }
        // console.log(tables, this.action, this.type, this.ip, this.out_ip);
        return tables;
      }
    },
    watch: {
      display: function (val) {
        if (!this.clickTables.length) {
          this.$emit('click');
        }
      },
    },
    methods: {
      getParams: function (table) {
        let params = clickConfig.special_actionType_to_params(table, this.action, this.type, this.ip, this.out_ip);
        // console.log(params);
        return params;
      },
      getUrl: function (table) {
        return this.clickBaseTables[table]['data_url'];
      },
      getHead: function (table) {
        return this.clickBaseTables[table]['head'];
      },
      getTitle: function (table) {
        // console.log(table);
        return this.clickBaseTables[table]['title'];
      },
      handleClick(tab, event) {
        if (tab.name === 'graph'){
          this.clickGraph += 1;
        }
        // this.all_tabs[tab.index]["iframe"]="/"+tab.$props.name
      },
    },
    created() {
    }

  }
</script>