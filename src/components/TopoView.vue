<template>
    <div>
        <h4 class="sub-header">
            {{config[click_type].neighbour.title}}
        </h4>
        <BaseTableWithPager
            ref="neighbour_table"
            :data_url="config[click_type].neighbour.url"
            :table_head="config['topo_view'].topo_view.neighbour_table_head"
            :extra_condition="config[click_type].neighbour.params"
            :page_name="click_type"
        ></BaseTableWithPager>
        

        <h4 class="sub-header">
            {{config[click_type].three_hops.title}}
        </h4>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="3-Hops 邻居" name="first">
            <BaseTableWithPager
                ref="three_hops_table"
                :data_url="config[click_type].three_hops.url"
                :table_head="config['topo_view'].topo_view.three_hops_table_head"
                :extra_condition="config[click_type].three_hops.params"
                :page_name="click_type"
            ></BaseTableWithPager>
            </el-tab-pane>
            <el-tab-pane label="可视化" name="second">
                可视化
            </el-tab-pane>
    
        </el-tabs>
    </div>
</template>

<script>
import config from "@/assets/TopoViewConfig.json"
export default {
    props:["ip","click_type"],
    data(){
        return {
            config:config,
            activeName:"first"
        }
    }
}
</script>