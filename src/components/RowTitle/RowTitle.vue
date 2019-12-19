<template>
  <div class="row-title" :style="styleObj">
    <span class="row-icon" v-if="rowIcon">
      <i class="icon iconfont" :class="rowIcon"></i>
    </span>
    <span class="row-title-item">
      {{ rowTitle }}
      <span class="sub-title" v-if="subTitle">{{ subTitle }}</span>
    </span>
    <a v-if="moreInfo" class="more-info"
      >更多活动 <i class="icon iconfont icon-jinru2"></i>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class RowTitle extends Vue {
  @Prop({ default: '行标题必须传值' }) rowTitle!: string
  @Prop({ default: '' }) subTitle!: string
  @Prop({ default: 'left' }) textCenter!: string
  @Prop({ default: '' }) rowIcon!: string
  @Prop({ default: false }) moreInfo!: boolean

  get styleObj() {
    return {
      textAlign: this.textCenter
    }
  }
}
</script>
<style lang="scss" scoped>
.row-title {
  width: 100%;
  height: 28px;
  line-height: 28px;
}
.row-icon > .iconfont {
  font-size: 26px;
  color: salmon;
  margin-right: 20px;
}
.row-title-item {
  font-size: 26px;
  font-family: 'MicrosoftYaHei';
  font-weight: 400;
  color: $dark-black;
}
.sub-title {
  font-size: 14px;
  color: $light-black;
  margin-left: 20px;
}
.more-info {
  position: relative;
  top: 6px;
  float: right;
  font-size: 12px;
  font-weight: 400;
  color: $dark-black;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  & > .iconfont {
    font-size: 12px;
  }
  &:hover {
    color: salmon;
    font-weight: bolder;
  }
}
</style>
