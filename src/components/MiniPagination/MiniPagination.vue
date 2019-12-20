<template>
  <div class="block ibd-page-box">
    <el-pagination
      layout="prev, next"
      :total="totalNum"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'MiniPagination',
  props: {
    totalNum: {
      type: Number,
      default: () => 40
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('simplePaginnation', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.ibd-page-box {
  text-align: center;
}
.ibd-page-box ::v-deep button {
  background-color: rgba(230, 233, 237, 1);
  background: rgba(230, 233, 237, 1);
  padding: 0;
  margin: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  min-width: 20px;
  background: rgba(230, 233, 237, 1);
  & > i {
    display: inline-block;
  }
  &:hover {
    background-color: rgba(217, 221, 225, 1);
    background: rgba(217, 221, 225, 1);
  }
}
.ibd-page-box ::v-deep button:first-child {
  margin-right: 10px;
}
</style>
