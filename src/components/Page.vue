<template>
  <div>
    <div ref="click_div" style="display:none">
      
    </div>
    <div ref="base_div">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      ></BaseForms>
      <BaseTableWithPager
        ref="table"
        :data_url="this.button_items.commit_url"
        :table_head="table_head"
        :extra_condition="table_condition"
        :page_name="page_name"
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
import selectToActionAndType from "@/assets/selectToActionAndType.json";
export default {
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
      table_condition: params
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
      return this.compunents_info.input_info;
    },
    button_items: function() {
      return this.compunents_info.button_items;
    },
    inputs_data: function() {
      var input_count = this.compunents_info.input_info.length;
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
      return this.compunents_info.table_head;
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
      Object.assign(params, this.forms_conditon);
      console.log("bf:", this.extra_condition);

      this.$refs.table.refresh(params);
      // this.fetchData(1, this.pageSize, params);
      // this.$axios
      //   .get(this.button_items.commit_url, {
      //     params: params
      //   })
      //   .then(res => {
      //     // success callback
      //   })
      //   .catch(err => {
      //     // error callback
      //   });
    },
    export_event: function(params) {
      params[this.all_action_options.name] = this.action;
      if (this.have_type_options) {
        params[this.all_type_options.name] = this.type;
      }

      params["export_limit"] = 5000;
      var export_params = Object.keys(params)
        .map(function(key) {
          // body...
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&");
      this.$refs["downloadtag"].href = "/db?" + export_params;

      // this.$refs["downloadtag"].firstElementChild.click();

      console.log(this.$refs["downloadtag"].href);
    },
    select_change: function() {
      this.$refs.forms.clean()
      var params = this.$refs.forms.submit_condition;
      // console.log(params)
      // console.log(this.action)
      // console.log(this.type)
      // console.log(selectToActionAndType[this.action])
      // console.log(selectToActionAndType[this.action][this.type])
      this.currentPage = 1;
      this.forms_conditon=params
      // params[this.all_action_options.name] = this.action;
      // if (this.have_type_options) {
      //   params[this.all_type_options.name] = this.type;
      // }
      if(this.type===""){
        params["action"] = selectToActionAndType[this.action]["action"];
        params["type"] = selectToActionAndType[this.action]["type"];
      }
      else{
        params["action"] = selectToActionAndType[this.action][this.type]["action"];
        params["type"] = selectToActionAndType[this.action][this.type]["type"];
      }
      Object.assign(params, this.forms_conditon);
      this.$refs.table.refresh(params);
    }
  }
};
</script>