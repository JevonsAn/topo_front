<template>
    <div>
    <el-table
      :data="table_data"
      border
      v-if="page_name === 'router'"
      style="width: 100%">
      <el-table-column width="150px" label="编号" type="index">
      </el-table-column>
      <el-table-column v-for="column in table_head" :key="column.title" :prop="column.name" :width="column.width" :label="column.title" :type="column.type">
        <template slot-scope="scope">
          <p v-if="column.name ==='ip'" @click="$emit('click_ip', scope.row.ip)">{{scope.row.ip}}</p>
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
      border
      style="width: 100%"
      @sort-change="sort_change"
      ref="table"
      >
      <template v-for="column in table_head">
        <el-table-column v-if=" column.name in formatters " :key="column.title"
                       :width="column.width" :label="column.title" :type="column.type" :sortable="column.sort?'custom':false"
                        :formatter="formatters[column.name]">
        </el-table-column>
        <el-table-column v-else :key="column.title" :prop="column.name"
                       :width="column.width" :label="column.title" :type="column.type" :sortable="column.sort?'custom':false">
          <template slot-scope="scope">
            <p v-if="column.name ==='ip'"
               @dblclick="$emit('node-click', scope.row.ip)">{{scope.row.ip}}
            </p>
            <p v-else-if="column.name ==='in_ip' || column.name ==='out_ip'"
               @dblclick="$emit('edge-click', scope.row.in_ip, scope.row.out_ip)">{{ scope.row[column.name] }}
            </p>
            <p v-else-if="column.name ==='pop_id'"
               @dblclick="$emit('node-click', scope.row.pop_id)">{{ scope.row[column.name] }}
            </p>
            <p v-else-if="column.name ==='first_seen'">
               {{ scope.row.first_seen }} <br/> {{ scope.row.last_seen }}
            </p>
            <p v-else-if="column.name === 'in_country'">
               {{ scope.row.in_country }} <br/> {{ scope.row.in_city }}
            </p>
            <p v-else-if="column.name === 'out_country'">
               {{ scope.row.out_country }} <br/> {{ scope.row.out_city }}
            </p>
            
            <base-button
              v-else-if="column.name ==='result_url'"
              size="mini"
              @click="$emit('click_result_url',scope.row)">查看详情
            </base-button>
            <span v-else>{{ scope.row[column.name] }}</span>
          </template>
        </el-table-column>
      </template>

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
      formatters: {
        // "seen_formatter": function (row, column) {
        //   return row.first_seen + " " + row.last_seen;
        // },
        "is_dest":function (row, column) {
          if(row.is_dest=="Y")
            return "是"
          else if(row.is_dest=="N")
            return "否"
          else
            return row.is_dest
          // return row.first_seen + " " + row.last_seen;
        },
        "is_as_boundary":function (row, column) {
          if(row.is_dest=="Y")
            return "是"
          else if(row.is_dest=="N")
            return "否"
          else
            return row.is_dest
          // return row.first_seen + " " + row.last_seen;
        },
        "is_country_boundary":function (row, column) {
          if(row.is_dest=="Y")
            return "是"
          else if(row.is_dest=="N")
            return "否"
          else
            return row.is_dest
          // return row.first_seen + " " + row.last_seen;
        },
      }
    }
  },
  methods:{
    sort_change:function (params) {
      this.$emit("sort-change",params)
    },
    clearSort:function (params) {
      this.$refs["table"].clearSort()
    }
  }
}
</script>