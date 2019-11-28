<template>
  <div>
    <el-tabs type="border-card"  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="统计信息" name="statistics">
        
      </el-tab-pane>
      <el-tab-pane v-for="(page_tab_value,index) in ordinaryPage"  :label="page_tab_value['text']" :name="page_tab_value['name']" :key="index">
        <Page :page_config="page_tab_value['page']" :page_name="page_tab_value['name']"></Page>
      </el-tab-pane>
      <el-tab-pane label="路由器配置解析" name="router">
        <router-page v-bind="specialPage['router']"></router-page>
      </el-tab-pane>
    </el-tabs>
    <!-- <router-view/> -->
  </div>
</template>
<script>
  import Page from "@/components/Page";
  import AllPageConfig from "@/assets/AllPageConfig.json";
  import RouterPage from "@/components/RouterPage";
  export default {
    data() {
      return {
        
        specialPage : AllPageConfig.specialPage,
        ordinaryPage:AllPageConfig.ordinaryPage,
        activeName: 'statistics'
      };
    },
    methods: {
      handleClick(tab, event) {
        // this.all_tabs[tab.index]["iframe"]="/"+tab.$props.name
      }
    },
    
    components:{
      Page:Page,
      RouterPage:RouterPage
    }
  };
</script>