<template>
  <div class="right-layout">
    <div v-show="rightbar" class="show-triangle">
      <span @click="triangleBtn">
        <i class="icon iconfont icon-zuojiantouD"></i>
      </span>
    </div>
    <div class="slot-item-box">
      <div class="slot-item">
        <slot name="lecturer"></slot>
      </div>
      <div class="slot-item slot-item-befort" v-show="showName">
        <slot></slot>
      </div>
      <span class="slot-item-close" @click="colseBtn">
        <i class="el-icon-close"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightLayout',
  props: {
    rightbar: {
      type: Boolean,
      required: false,
      default: () => ''
    },
    showName: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  mounted() {},
  methods: {
    triangleBtn() {
      this.$emit('triangleBtn')
    },
    colseBtn() {
      this.$emit('colseBtn')
    }
  }
}
</script>

<style lang="scss" scoped>
.right-layout {
  position: relative;
  min-width: 60px;
  height: 100%;
  .show-triangle {
    width: 60px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 1);
    opacity: 0.3;
    span {
      display: flex;
      width: 100%;
      padding: 20px 0;
      flex-direction: column;
      align-items: center;
      color: rgba(255, 255, 255, 1);
      opacity: 0.3;
      cursor: pointer;
      i {
        margin-bottom: 5px;
      }
      &:hover {
        opacity: 0.6;
        background-color: #25282b;
      }
    }
  }
  .slot-item-box {
    width: 424px;
    height: 100%;
    position: relative;
    & > div {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    .slot-item-close {
      position: absolute;
      top: 10px;
      right: 20px;
      display: inline-block;
      font-size: 20px;
      padding: 5px;
      color: #737980;
      cursor: pointer;
      &:hover {
        color: #ffd200;
      }
    }
  }
}
</style>
