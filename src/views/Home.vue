<template>
  <div>
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="统计信息" name="statistics">
        <iframe
          ref="statisticsframe"
          runat="server"
          :src="statistics_address"
          width="100%"
          height="2100px"
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          allowtransparency="yes"
        ></iframe>
      </el-tab-pane>
      <el-tab-pane
        v-for="(page_tab_value,index) in ordinaryPage"
        :label="page_tab_value['text']"
        :name="page_tab_value['name']"
        :key="index"
      >
        <Page :page_config="page_tab_value['page']" :page_name="page_tab_value['name']"></Page>
      </el-tab-pane>
      <el-tab-pane label="逻辑拓扑-AS级" name="as">
        <iframe
          ref="asframe"
          runat="server"
          :src="bgp_address"
          width="100%"
          height="1100px"
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          allowtransparency="yes"
        ></iframe>
      </el-tab-pane>
      <el-tab-pane label="路由器配置解析" name="router">
        <iframe
          id="routerframe"
          runat="server"
          :src="router_address"
          width="100%"
          height="1100px"
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          allowtransparency="yes"
        ></iframe>
      </el-tab-pane>
    </el-tabs>
    <!-- <router-view/> -->
  </div>
</template>
<script>
import Page from "@/components/Page";
import AllPageConfig from "@/assets/AllPageConfig.json";
import RouterPage from "@/components/RouterPage";
import address from "@/assets/address";
export default {
  data() {
    return {
      specialPage: AllPageConfig.specialPage,
      ordinaryPage: AllPageConfig.ordinaryPage,
      activeName: "statistics",
      statistics_address: address.topo_celery + "/statistics",
      bgp_address: address.bgp + "/totalquery",
      router_address: address.topo_celery + "/routerconf"
    };
  },
  methods: {
    handleClick(tab, event) {
      // this.all_tabs[tab.index]["iframe"]="/"+tab.$props.name
    },
    changeFrameHeight() {
      let ifm = document.getElementById("routerframe");
      ifm.height = document.documentElement.clientHeight;
    }
  },

  components: {
    Page: Page,
    RouterPage: RouterPage
  }
};
</script>
<style>
  /* @import '../assets/iconfont/webstyle.css'; */
  .ball-pulse > div {
  background: orange;
}

th {
  white-space: nowrap;
}

table {
  white-space: nowrap;
  table-layout: fixed !important;
  /* margin: 0px 30px!important; */
  border-collapse: separate;
  font-weight: 500;
  font-size: 14px;
}
table th {
  padding: 0px !important;
  background-color: #3498e9 !important;
  color: #fff !important;
  height: 57px !important;
  text-align: center !important;
  vertical-align: middle !important;
  border: 1px solid #fff !important;
}
thead tr {
  height: 57px !important;
}
tbody tr {
  height: 57px !important;
  background-color: #fff !important;
  color: #606266 !important;
  text-align: center !important;

  vertical-align: middle !important;
}
tbody td {
  padding: 0px !important;
  text-align: center !important;
  vertical-align: middle !important;
}
.refresh {
  width: 22px;
  height: 22px;
  margin-right: 4px;
  float: right;
  cursor: pointer;
}
.refresh img {
  width: 100%;
  height: 100%;
}
.content {
  overflow-x: hidden;
}

text {
  font: 12px Microsoft YaHei;
  pointer-events: none;
  text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
}

.el-input input {
  /*margin-right: 8px !important;*/
  /*color: #fff;
	border-color: "#E5E5E5";*/
}

.el-input input {
  height: 30px !important;
  padding: 1px 12px !important;
  line-height: 10px !important;
  background-color: #fff;
  border: 1px solid #e5e5e5;
}
.el-select .el-input input {
  display: inline-block;
  margin: 0px 10px 5px 0px;
  text-align: center;
  text-align-last: center;
}
.well {
  background-color: #fff !important;
}
.el-form-item__content > div > button{
  color: #8cc5ff !important;
  background-color: #ecf5ff !important;
  border: 1px solid #d9ecff !important;
  height: 30px !important;
  line-height: 13px !important;
  padding: 8px 15px !important;
  font-size: 12px !important;

  border-radius: 3px !important;
  margin: 0px 10px 0px 0px !important;
}

.el-form-item__content > div > button:hover {
  color: #409eff !important;
  background-color: #ecf5ff !important;
  border: 1px solid #b3d8ff !important;
}
.el-form-item__content > div > button:active {
  color: #ffffff !important;
  background-color: #409eff !important;
  border: 1px solid #409eff !important;
}
.jsgrid-header-sort-asc:before {
  border-color: transparent transparent #000 !important;
}

.jsgrid-header-sort-desc:before {
  border-color: #000 transparent transparent !important;
}

body {
  font-size: 12px;
}
.el-tabs__nav{
  border:0px !important;
}
.el-tabs__nav > div.is-active{
  background-color: #3498e9 !important;
  border: 1px solid transparent !important;
  border-radius: 10px 10px 0 0 !important;
  color: #fff !important;
  text-align: center !important;
}
.el-tabs__nav > div.is-active:focus {
  background-color: #3498e9 !important;
  border: 1px solid transparent !important;
  border-radius: 10px 10px 0 0 !important;
  color: #fff !important;
  text-align: center !important;
}
.el-tabs__nav > div.is-active:hover {
  background-color: #3498e9 !important;
  border: 1px solid transparent !important;
  border-radius: 10px 10px 0 0 !important;
  color: #fff !important;
  text-align: center !important;
}
.el-tabs__nav > div:hover {
  background-color: #e5e5e5 !important;
  border: 1px solid #ddd;
  text-align: center !important;
}
.el-tabs__nav > div {
  /* background-color: #fff !important; */
  height: 34px;
  border: 1px solid #ddd;
  border-radius: 10px 10px 0 0 !important;
  font-weight: bold !important;
  line-height: 12px;
  min-width: 25px;
  color: #555 !important;
  text-align: center !important;
  padding:10px;
}

.field {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.field:hover {
  text-overflow: inherit;
  white-space: normal;
  word-break: break-all;
  overflow: visible;
}
.el-table .cell {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.el-table .cell:hover {
  text-overflow: inherit;
  white-space: normal;
  word-break: break-all;
  overflow: visible;
}

.el-form-item {
  margin-right: 0px;
  margin-bottom: 0px;
}

.el-form-item>.el-form-item__content>.el-input{
  width:150px;
}

.el-form-item .el-radio{
  margin-right: 10px;
}
.el-form-item .el-select{
  width:auto;
  min-width: 10px;
  max-width: 120px;
}

.el-form-item .el-select input{
  color: #8cc5ff !important;
  background-color: #ecf5ff !important;
  border: 1px solid #d9ecff !important;
  height: 30px !important;
  line-height: 13px !important;
  padding: 8px 15px !important;
  font-size: 12px !important;

  border-radius: 3px !important;
  margin: 0px 10px 0px 0px !important;
}

.el-form-item .el-select input:hover {
  color: #409eff !important;
  background-color: #ecf5ff !important;
  border: 1px solid #b3d8ff !important;
}
.el-form-item .el-select input:active {
  color: #ffffff !important;
  background-color: #409eff !important;
  border: 1px solid #409eff !important;
}
.el-form-item .el-form-item__label {
  font-weight: 700;
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}

.el-radio {
  font-weight: 700;
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}

.el-tabs__item {
  font-weight: 700;
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}

</style>
<style scoped>

</style>