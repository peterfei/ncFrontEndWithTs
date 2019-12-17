<template>
  <div class="hhh-rate">
    <el-rate
      disabled
      :value="starts"
      :colors="['#F38622', '#F38622', '#F38622']"
      disabled-void-color="#FFC063"
    >
    </el-rate>
  </div>
</template>
<script>
export default {
  props: {
    starts: {
      type: Number,
      required: false,
      default: () => 0
    }
  }
}
</script>
<style lang="scss" scoped>
.hhh-rate ::v-deep i.el-rate__icon {
  font-size: 12px !important;
  margin-right: 2px !important;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
</style>
