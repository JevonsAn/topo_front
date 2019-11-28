<template>
  <el-form :inline="true"  class="demo-form-inline">
    
    <el-form-item v-for="(input_info,index) in inputs_info" :label="input_info.label" :key="input_info.name">
      <base-input :type="input_info.type" v-model="local_inputs_data[index]"></base-input>
    </el-form-item>

    <el-form-item v-for="(radio,index) in front_radio" :label="radio.label" :key="radio.label">
      <base-radio v-bind:options="radio.options" v-model="front_radio_data[index]"></base-radio>
    </el-form-item>
    <el-form-item>
      <base-button type="primary" @click="submitForm()">提交</base-button>
      
    </el-form-item>
    
    <el-form-item>
      <base-button @click="exportData()">导出</base-button>
      
    </el-form-item>
    <el-form-item :label="backward_radio.label">
      <base-radio v-bind:options="backward_radio.options" v-model="export_type"></base-radio>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props:{
      inputs_info:Array,
      inputs_data:Array,
      button_items:Object,
      backward_radio:Object,
      front_radio:Array
    },
    data(){
      var front_radio_count = this.front_radio.length;
      var front_radio_data = new Array(front_radio_count);
      front_radio_data = front_radio_data.fill("", 0, front_radio_data);
      for(let i in this.front_radio){
        front_radio_data[i]=this.front_radio[i].options[0].value
      }
      return {
        local_inputs_data : this.inputs_data,
        submit_condition:{},
        export_type:'json',
        front_radio_data:front_radio_data
      };
    },
    computed:{
    },
    methods: {
      submitForm() {
        this.submit_condition={}
        // this.$refs["inputs_form"]
        let commit_data={}
        for(let i in this.local_inputs_data){
          if(this.local_inputs_data[i]!=='')
            commit_data[this.inputs_info[i].name]=this.local_inputs_data[i]
        }
        Object.assign(this.submit_condition,commit_data)
        this.$emit("submit",commit_data)

      },
      exportData() {
        var export_condition={}
        export_condition["export"]= true
        export_condition["export_type"]= this.export_type
        Object.assign(export_condition,this.submit_condition)
        this.$emit("export_event",export_condition)
      }
    }
  }
</script>