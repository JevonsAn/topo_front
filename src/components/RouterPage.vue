<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <base-button>导入配置文件</base-button>
      </el-form-item>

      <el-form-item>
        <base-button @click="refresh_table">刷新</base-button>
      </el-form-item>
    </el-form>

    <base-table-with-pager
    ref="table"
      :table_head="table_head"
      :data_url="data_url"
      :extra_condition="condition"
      page_name="router"
    ></base-table-with-pager>
  </div>
</template>

<script>
export default {
    props:["table_head","data_url"],
  data() {
    return {
      condition: {
        order: "asc"
      }
    };
  },
  methods:{
      refresh_table:function() {
          this.$refs.table.refresh()
      }
  }
};
</script>