<template>
    <div>
        <el-button :type="type" @click="$emit('click')" size="small">
            <slot ></slot>
        </el-button>
    </div>
</template>

<script>
export default {
    name:"BaseButton",
    props:{
        type:{
            type:String
        }
    },
    data:function(){
        return{}
    }
}
</script>
