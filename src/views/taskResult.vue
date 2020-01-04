<template>
  <div>
    <h2 class="sub-header">{{sub_title}}</h2>
    <BaseForms
      :inputs_info="inputs_info"
      :inputs_data="inputs_data"
      :button_items="button_items"
      :front_radio_str="front_radio"
      :backward_radio_str="backward_radio"
      @submit="commit"
      @export_event="export_event"
      ref="forms"
      :inputs_identifier="'taskResult'"
      style="text-align: left"
    ></BaseForms>
    <br />
    <BaseTableWithPager
      ref="table"
      :data_url="this.button_items.commit_url"
      :table_head="table_head"
      :extra_condition="table_condition"
      :page_name="'taskResult'"
      @ip-click="handleIpClick"
    ></BaseTableWithPager>
    <a ref="downloadtag" href style="display:none;">
      <p></p>
    </a>
  </div>
</template>

<script>
import tableConfig from "../assets/tableConfig";
import inputsInfoConfig from "../assets/inputsInfoConfig";
import taskResultConfig from "../assets/taskResultConfig";
export default {
  props: {
    taskType: String,
    query:Object
  },
  data() {
    return {
      select_config: "",
      forms_conditon: {},
      // table_condition: Object.assign({"action":"links"},this.query),
      isClickdivDisplay: "none",
      click_ip: "",
      click_out_ip: ""
    };
  },
  computed: {
    compunents_info: function() {
      console.log(this.taskType)
      console.log(taskResultConfig.hasOwnProperty(this.taskType))
      console.log(taskResultConfig.hasOwnProperty("ipv4_link"))
      console.log(taskResultConfig)
      console.log(this.query)
      if (taskResultConfig.hasOwnProperty(this.taskType)) {
        return taskResultConfig[this.taskType];
      }
      return {};
    },
    sub_title: function () {
      return this.compunents_info["sub_title"]
    },
    inputs_info: function() {
      // console.log(this.compunents_info.input_info)
      // console.log(inputsInfoConfig)
      // console.log(inputsInfoConfig.inputsInfo[this.compunents_info.input_info])
      console.log(this.compunents_info)
      return inputsInfoConfig.inputsInfo[this.compunents_info.input_info];
    },
    button_items: function() {
      return this.compunents_info.button_items;
    },
    inputs_data: function() {
      var input_count = this.inputs_info.length;
      var input_data = new Array(input_count);
      input_data = input_data.fill("", 0, input_count);
      return input_data;
    },
    backward_radio: function() {
      return this.compunents_info.backward_radio;
    },
    front_radio: function() {
      return this.compunents_info.front_radio;
    },
    table_condition:function () {
      var table_condition={
        "action":"links"
      };
      if(this.query.hasOwnProperty("task")){
        table_condition["task_id"]=this.query["task"];
      }
      return table_condition;
    },
    table_head: function() {
      // console.log(this.compunents_info.table_head);
      // console.log(tableConfig.table_heads[this.compunents_info.table_head]);
      return tableConfig.table_heads[this.compunents_info.table_head];
    },
    export_url: function() {
      return this.button_items.export_url;
    }
  }
};
</script>
<style>
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
button.btn {
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

button.btn:hover {
  color: #409eff !important;
  background-color: #ecf5ff !important;
  border: 1px solid #b3d8ff !important;
}
button.btn:active {
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

.nav-tabs > li.active > a {
  background-color: #3498e9 !important;
  border: 1px solid transparent !important;
  border-radius: 10px 10px 0 0 !important;
  color: #fff !important;
}
.nav-tabs > li.active > a:focus {
  background-color: #3498e9 !important;
  border: 1px solid transparent !important;
  border-radius: 10px 10px 0 0 !important;
  color: #fff !important;
}
.nav-tabs > li.active > a:hover {
  background-color: #3498e9 !important;
  border: 1px solid transparent !important;
  border-radius: 10px 10px 0 0 !important;
  color: #fff !important;
}
.nav-tabs > li > a:hover {
  background-color: #e5e5e5 !important;
  border: 1px solid #ddd;
}
.nav-tabs > li > a {
  background-color: #fff !important;
  border: 1px solid #ddd;
  border-radius: 10px 10px 0 0 !important;
  font-weight: bold !important;
  line-height: 12px;
  min-width: 25px;
  color: #555 !important;
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
</style>