<template>
  <div>
    <base-button type="text" @click="dialogVisible = true">{{text}}</base-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <slot name="data"></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
      text:{
          required: true
      }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>