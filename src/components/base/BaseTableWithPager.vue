<template>
  <div>
    <BaseTable :table_head="table_head" :table_data="data" :page_name="page_name"
               @node-click="sendNodeClick" @edge-click="sendEdgeClick" @sort-change="sort_change" ref='table'
    ></BaseTable>
    <br/>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 15, 30, 100]"
      :page-size="pageSize"
      layout="slot, prev, pager, next, sizes, jumper"
      :total="(total!==null) ? total : 1000"
      style="text-align: center"
    >
      <span class="el-pagination__total">共 {{ (total!==null) ? total : '未知' }} 条， 用时：{{ spent_time }} s</span>
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ["data_url","table_head","extra_condition","page_name"],
  data() {
    let table_data={
      data:[],
      itemsCount:0
    };
    return {
      table_data: table_data,
      pageSize: 15,
      currentPage: 1,
      condition: ( this.extra_condition !== undefined ) ? this.extra_condition : {},
      sortCondition:{}
    };
  },
  computed:{
    total:function () {
      // let content = this.table_data.itemsCount;
      // return (content!==null) ? content : 1000;
      return this.table_data.itemsCount;
    },
    count_txt: function () {
      let content = this.table_data.itemsCount;
      return (content) ? content : "未知";
    },
    data: function () {
      if (this.table_data !== undefined && 'data' in this.table_data){
        let start = this.pageSize * (this.currentPage - 1);
        let end = start + this.pageSize;
        if (this.table_data.data.length > this.pageSize)
          return this.table_data.data.slice(start, end);
        else
          return this.table_data.data
      }
      else
        return [];
    },
    spent_time: function () {
      let t = 0;
      if (this.table_data !== undefined && 'time' in this.table_data)
        t = this.table_data.time;
      return t.toFixed(2);
    }
  },
  methods:{
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
    //   var comdition = this.$refs.forms.submit_condition;
    //   this.fetchData(1, pageSize, comdition);
      // console.log(`每页 ${val} 条`);
      this.fetchData()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    //   var comdition = this.$refs.forms.submit_condition;
    //   this.fetchData(currentPage, this.pageSize, this.extra_condition);
      // console.log(`当前页: ${val}`);
      this.fetchData()
    },
    sendNodeClick(ip){
      this.$emit('ip-click', ip);
    },
    sendEdgeClick(in_ip, out_ip){
      this.$emit('ip-click', in_ip, out_ip);
    },
    sort_change(params){
      this.sortCondition={
        "sortField":params.prop,
        "sortOrder":params.order
      };
      // console.log(params);
      this.fetchData()
    },
    fetchData() {
      let commit_params = {};
      commit_params["pageIndex"] = this.currentPage;
      commit_params["pageSize"] = this.pageSize;

      Object.assign(commit_params, this.condition,this.sortCondition);
      console.log("commit_params:",commit_params);
      // let url = ( this.data_url.startsWith("/api") || this.data_url.startsWith("/celery") || this.data_url.startsWith("/website") ) ?
      //   this.data_url : ( "/api" + this.data_url );
      let url = this.data_url;
      this.$axios
        .get(url, {
          params: commit_params
        })
        .then(res => {
          console.log(res.data);
          this.table_data=res.data
          // success callback
        })
        .catch(err => {
          this.table_data={
            "itemsCount": 0,
            "time": 0,
            "data": []
          }
        });
    },
    refresh(condition){
      this.currentPage=1;
      this.pageSize=15;
      this.table_data=[];
      if(condition !== undefined)
        this.condition=condition;
      else{
        this.fetchData();
      }
    }
  },
  watch: {
    condition: function (val) {
      this.$refs["table"].clearSort();
      this.sortCondition={};
      this.fetchData();
    },
    extra_condition: function (val) {
      this.condition = val;
    }
  },
  created(){
      console.log(this.data_url);
      this.refresh()
  }
};
</script>