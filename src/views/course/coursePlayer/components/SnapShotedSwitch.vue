<template>
  <div class="snap-shoted-switch">
    <el-switch
      v-model="value"
      active-color="#40c78d"
      inactive-color="#B6BABF"
      @change="changeSwitch"
    >
    </el-switch>
  </div>
</template>

<script>
export default {
  name: 'SnapShotedSwitch',
  data() {
    return {
      value: false,
    };
  },
  methods: {
    changeSwitch() {
      this.$emit('snapShotedSwitch', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.snap-shoted-switch {
  & /deep/ .el-switch__core {
    width: 62px !important;
    height: 22px !important;
    line-height: 22px;
  }

  & /deep/ .el-switch__core:after {
    content: "截图";
    width: 40px !important;
    height: 20px !important;
    border-radius: 20px;
    text-align: center;
    font-size: 12px;
    color: rgba(138, 145, 153, 1);
    top: 0px;
    left: -1px;
  }
  & /deep/ .el-switch.is-checked .el-switch__core::after {
    left: 20px;
    margin-left: 0;
  }
}
</style>
