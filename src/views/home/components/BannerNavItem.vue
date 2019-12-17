<template>
  <div class="banner-nav-hover" @mouseenter="mouseenter">
    <div class="banner-nav-item">
      <i class="icon iconfont icon-shezhi banner-nav-icon"></i>
      <span class="word-spot">{{ cateName }}</span>
      <i class="el-icon-arrow-right arrow-right"></i>
    </div>
    <div class="banner-nav-item-content">
      <slot name="bannerNavFilter"></slot>
      <slot name="recommentCourse" class="recomment-course"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class BannerNavItem extends Vue {
  @Prop({ default: '暂无分类' }) cateName!: string

  public mouseenter(): void {
    this.$emit('mouseenter', this.cateName)
  }
}
</script>

<style lang="scss" scoped>
.banner-nav-hover:hover {
  .banner-nav-item-content {
    // top: -1px;
    width: 648px;
    min-height: 100%;
    opacity: 0.98;
  }
}
.banner-nav-item {
  position: relative;
  width: 100%;
  height: 81px;
  line-height: 80px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background: rgba(48, 50, 51, 1);
  }
  .banner-nav-icon {
    padding: 28px 20px 28px 28px;
  }
  .arrow-right {
    float: right;
    padding: 0 28px;
    line-height: 80px;
  }
  & > .iconfont {
    font-size: 21px;
  }
  & > span {
    font-size: 18px;
    max-width: 120px;
  }
}
.banner-nav-item-content {
  position: absolute;
  z-index: 3;
  left: 100%;
  // display: none;
  top: 0px;
  width: 0px;
  min-height: 100%;
  padding-bottom: 10px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #e8ebed;
  opacity: 0;
  transition: all 0.3s;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
