<template>
    <div>
    <el-table
      :data="table_data"
      v-if="page_name === 'router'"
      style="width: 100%">
      <el-table-column width="150px" label="编号" type="index">
      </el-table-column>
      <el-table-column v-for="column in table_head" :key="column.title" :prop="column.name" :width="column.width" :label="column.title" :type="column.type">
        <template slot-scope="scope">
          
          <p v-if="column.name ==='ip'"  @click="$emit('click_ip')">{{scope.row.ip}}</p>
          <base-button 
          v-else-if="column.name ==='result_url'"
          size="mini"
          @click="$emit('click_result_url',scope.row)">查看详情</base-button>
          <span v-else>{{ scope.row[column.name] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-else
      :data="table_data"
      style="width: 100%">

      <el-table-column v-for="column in table_head" :key="column.title" :prop="column.name" :width="column.width" :label="column.title" :type="column.type">
        <template slot-scope="scope">
          
          <p v-if="column.name ==='ip'"  @click="$emit('click_ip')">{{scope.row.ip}}</p>
          <base-button 
          v-else-if="column.name ==='result_url'"
          size="mini"
          @click="$emit('click_result_url',scope.row)">查看详情</base-button>
          <span v-else>{{ scope.row[column.name] }}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
export default {
  props:{
    table_head:Array,
    table_data:Array,
    page_name:String
  },
      data() {
        return {
        }
      },
      methods:{
        aaa:function (param) {
          console.log(param);
          
        }
      }
    }
</script>