<template>
  <el-radio-group :value="value"  @input="handle" >
    <el-radio v-for="item in options" :key="item.label" :label="item.value">{{item.label}}</el-radio>
  </el-radio-group>
</template>
<script>
  export default {
    props:["value","options"],
    model:{
      prop:"value",
      event:'change'
    },
    data () {
      return {
        'aaa':this.value //如果直接把v-model="aaa"换成:value="value"，那么$event会一直是value的值。？奇怪的bug
      };
    },
    methods:{
      handle:function(new_value){
        console.log(new_value);
        // console.log(this.value);
        this.$emit("change",new_value)
      }
    }
  }
</script>