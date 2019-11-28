<template>
<div>
    <base-button @click="$emit('click')">返回</base-button>
    <template v-if=" click_type === 'ipv4_node' ">

        
    </template>
    <template v-else-if=" click_type === 'ipv6_node' ">
        <h4 class="sub-header">
            邻居
        </h4>
        <base-table-with-pager ></base-table-with-pager>
        
    </template>
    <template v-else-if=" click_type === 'logic_node' ">
        <h4 class="sub-header">
            邻居
        </h4>
        <base-table-with-pager ></base-table-with-pager>
        
    </template>
</div>
</template>


<script>
export default {
    props:{
        click_type:{
            type:String,
            required:true
        }

    }
}
</script>