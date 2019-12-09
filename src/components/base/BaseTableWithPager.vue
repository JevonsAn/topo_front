<template>
  <div>
    <BaseTable :table_head="table_head" :table_data="table_data.data" :page_name="page_name"></BaseTable>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 15, 30, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: ["data_url","table_head","extra_condition","page_name"],
  data() {
    var table_data={
          data:[],
          itemsCount:0
          }
    let condition={}
    if(this.extra_condition !==undefined)
      condition=this.extra_condition
    return {
      table_data: table_data,
      pageSize: 15,
      currentPage: 1,
      condition:condition
    };
  },
  computed:{
      
      total:function name(params) {
        return this.table_data.itemsCount  
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
    fetchData() {
      var commit_params = {};
      commit_params["pageIndex"] = this.currentPage;
      commit_params["pageSize"] = this.pageSize;

      Object.assign(commit_params, this.condition);
      console.log("wtf:",commit_params);
      this.$axios
        .get("/api" + this.data_url, {
          params: commit_params
        })
        .then(res => {
          console.log(res.data);
          this.table_data=res.data
          // success callback
        })
        .catch(err => {
          // error callback
        });
    },
    refresh(condition){
        this.table_data=[]
        if(condition !==undefined)
          this.condition=condition
        this.currentPage=1,
        this.pageSize=15
        this.fetchData()
    }
  },
  created(){
      console.log(this.data_url);
      
      this.refresh()
  }
};
</script>