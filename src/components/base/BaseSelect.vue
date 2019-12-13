<template>
  <el-select :value="value" @change="$emit('change',handle($event))" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.label"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
    props:["value","options","name"],
    model:{
      prop:"value",
      event:'change'
    },
    data(){
        return {}
    },
    methods:{
      handle:function(event){
        // console.log(event);
        return event
      }
    }
}
</script>