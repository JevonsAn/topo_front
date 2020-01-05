<template>
  <div>
    <div ref="click_div" :style="{display: isClickdivDisplay}">
      <IpClick
       :action="action"
       :type="type"
       :ip="click_ip"
       :out_ip="click_out_ip"
       :display="isClickdivDisplay"
       @click="backToBase"
      >      </IpClick>
    </div>
    <div ref="base_div" :style="{display: isBasedivDisplay}">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left">
        <el-form-item label="">
          <BaseSelect
            v-bind:name="all_action_options.name"
            :options="all_action_options.options"
            v-model="action"
            @change="select_change"
          ></BaseSelect>
        </el-form-item>
        <el-form-item v-if="have_type_options" label="">
          <BaseSelect
            
            v-bind:name="all_type_options.name"
            :options="all_type_options.options"
            v-model="type"
            @change="select_change"
          ></BaseSelect>
        </el-form-item>
      </el-form>

      <BaseForms
        :inputs_info="inputs_info"
        :inputs_data="inputs_data"
        :button_items="button_items"
        :front_radio_str="front_radio"
        :backward_radio_str="backward_radio"
        @submit="commit"
        @export_event="export_event"
        ref="forms"
        :inputs_identifier="this.action+this.type"
        style="text-align: left"
      ></BaseForms>
      <br/>
      <BaseTableWithPager
        ref="table"
        :data_url="this.button_items.commit_url"
        :table_head="table_head"
        :extra_condition="table_condition"
        :page_name="page_name"
        @ip-click="handleIpClick"
      ></BaseTableWithPager>
      <!-- <BaseTable :table_head="table_head" :table_data="table_data.data"></BaseTable>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 15, 30, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
      <a ref="downloadtag" href style="display:none;">
        <p></p>
      </a>
    </div>
  </div>
</template>

<script>
// import table_data from "@/assets/tableDataForTest";
import IpClick from "@/components/IpClick"
import selectToActionAndType from "@/assets/selectToActionAndType.json";
import tableConfig from "../assets/tableConfig"
import inputsInfoConfig from "../assets/inputsInfoConfig"
export default {
  components: {IpClick},
  props: ["page_config","page_name"],
  data() {
    let all_action_options = this.page_config.all_options;

    let action = all_action_options.options[0].value;
    let type = "";

    // find type of the first option
    if (all_action_options.options[0].hasOwnProperty("sub_select")) {
      let type_option = all_action_options.options[0].sub_select.options;
      type = type_option[0].value;
    } else {
      type = "";
    }

    var params = {};
    // this.forms_conditon=params
    // params[all_action_options.name] = action;
    if(type===""){
      params["action"] = selectToActionAndType[action]["action"];
      params["type"] = selectToActionAndType[action]["type"];
    }
    else{
      params["action"] = selectToActionAndType[action][type]["action"];
      params["type"] = selectToActionAndType[action][type]["type"];
    }

    return {
      select_config: "",
      all_action_options: all_action_options,
      action: action,
      type: type,
      formInline: {},
      forms_conditon: {},
      table_condition: params,
      isClickdivDisplay: "none",
      click_ip: "",
      click_out_ip: "",
    };
  },
  computed: {
    all_type_options: function() {
      for (let i of this.all_action_options.options) {
        if (i.value === this.action) {
          if (i.hasOwnProperty("sub_select")) {
            return i.sub_select;
          } else {
            return i;
          }
        }
      }

      return {};
    },
    have_type_options: function() {
      for (let i of this.all_action_options.options) {
        if (i.value === this.action) {
          if (i.hasOwnProperty("sub_select")) {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    },
    compunents_info: function() {
      for (let i of this.all_action_options.options) {
        if (i.value === this.action) {
          if (i.hasOwnProperty("sub_select")) {
            for (let j of i.sub_select.options) {
              if (j.value === this.type) {
                return j;
              }
            }
            return {};
          } else {
            return i.compunents_info;
          }
        }
      }

      return {};
    },
    inputs_info: function() {
      // console.log(this.compunents_info.input_info)
      // console.log(inputsInfoConfig)
      // console.log(inputsInfoConfig.inputsInfo[this.compunents_info.input_info])
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
    table_head: function() {
      // console.log(this.compunents_info.table_head);
      // console.log(tableConfig.table_heads[this.compunents_info.table_head]);
      return tableConfig.table_heads[this.compunents_info.table_head];
    },
    isBasedivDisplay: function () {
      if (this.isClickdivDisplay==="none")
        return "block";
      else
        return "none";
    },
    export_url:function () {
      return this.button_items.export_url
    }
  },
  methods: {
    commit: function(params) {
      this.currentPage = 1;
      this.forms_conditon = params;

      params[this.all_action_options.name] = this.action;
      if (this.have_type_options) {
        params[this.all_type_options.name] = this.type;
      }

      if(this.type==="" || this.action==="router_node"){
        params["action"] = selectToActionAndType[this.action]["action"];
        params["type"] = selectToActionAndType[this.action]["type"];
      }
      else{
        params["action"] = selectToActionAndType[this.action][this.type]["action"];
        params["type"] = selectToActionAndType[this.action][this.type]["type"];
      }

      Object.assign(params, this.forms_conditon);

      this.$refs.table.refresh(params);
    },
    export_event: function(params) {
      if(this.type==="" || this.action==="router_node"){
        params["action"] = selectToActionAndType[this.action]["action"];
        params["type"] = selectToActionAndType[this.action]["type"];
      }
      else{
        params["action"] = selectToActionAndType[this.action][this.type]["action"];
        params["type"] = selectToActionAndType[this.action][this.type]["type"];
      }

      params["export_limit"] = 5000;
      let export_params = Object.keys(params)
        .map(function(key) {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&");

      // let url = ( this.export_url.startsWith("/api") || this.export_url.startsWith("/celery") ) ?
      //    this.data_url : ( "/api" + this.export_url );
      let url = this.data_url;
      this.$refs["downloadtag"].href = url +"?"+ export_params;
      this.$refs["downloadtag"].firstElementChild.click();
    },
    select_change: function() {
      this.$refs.forms.refresh();
      var params = this.$refs.forms.submit_condition;
      this.currentPage = 1;
      this.forms_conditon=params;
      if(this.type==="" || this.action==="router_node"){
        params["action"] = selectToActionAndType[this.action]["action"];
        params["type"] = selectToActionAndType[this.action]["type"];
      }
      else{
        params["action"] = selectToActionAndType[this.action][this.type]["action"];
        params["type"] = selectToActionAndType[this.action][this.type]["type"];
      }
      Object.assign(params, this.forms_conditon);
      this.$refs.table.refresh(params);
    },
    handleIpClick: function (ip, out_ip) {
      this.click_ip = ip;
      this.click_out_ip = out_ip;
      // console.log("ipclick!");
      this.isClickdivDisplay = "block";
    },
    backToBase: function() {
      this.isClickdivDisplay = "none";
    },
  }
};
</script>