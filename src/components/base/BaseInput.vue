<template>
    <el-input :value="value" @input="handle"  :type="type" placeholder="请输入内容"></el-input>
</template>
<script>
export default {
    props:["type","value"],
    model:{
        prop:"value",
        event:"input"
    },
    data() {
        return {
            local_data:null
        }
    },
    methods: {
        handle:function (data) {
            console.log(data);
            
            this.$emit("input",data)
        }
    }   
}
</script>