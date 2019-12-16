<template>
  <div style="text-align: left">
    <base-button @click="$emit('click')">返回</base-button>
    <template v-for="table in clickTables">
      <h4 class="sub-header" style="font-size: large">
        {{ getTitle(table) }}
      </h4>
      <BaseTableWithPager
        :data_url="getUrl(table)"
        :table_head="getHead(table)"
        :extra_condition="getParams(table)"
        :page_name="page_name"
      ></BaseTableWithPager>
      <br/>
      <HR/>
    </template>
  </div>
</template>


<script>
  import clickConfig from "../assets/clickTable"
  export default {
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
    },
    data() {
      return {
        clickBaseTables: clickConfig.clickTables,
        page_name: "ipClick"
      };
    },
    computed: {
      clickTables: function () {
        let tables = clickConfig.clickPageTables(this.action, this.type);
        if (!tables.length) {
          this.$emit('click');
        }
        // console.log(tables, this.action, this.type, this.ip, this.out_ip);
        return tables;
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
    },
    created() {
    }

  }
</script>