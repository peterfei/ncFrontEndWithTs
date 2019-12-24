<template>
  <div class="img-introd-box">
    <div>
      <a href="" class="img-content">
        <img :src="infoImg" alt="" class="" />
        <span class="type-tag fs12">
          NEW
        </span>
        <span class="catalog-tag fs12">
          计算机基础
        </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class TestImg extends Vue {
  @Prop({ default: '' }) infoImg!: string
}
</script>

<style lang="scss">
.img-introd-box {
  .img-content {
    width: 226px;
    height: 129px;
    // background: #ccc;
    position: relative;
    border-radius: 10px;
    .type-tag {
      right: -5px;
      display: inline-block;
      position: absolute;
      top: -8px;
      width: 40px;
      height: 20px;
      background: linear-gradient(
        90deg,
        rgba(255, 150, 100, 1) 0%,
        rgba(255, 100, 60, 1) 100%
      );
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      color: #fff;
      font-weight: bold;
    }
    .catalog-tag {
      width: 85px;
      height: 24px;
      background: rgba(0, 0, 0, 1);
      opacity: 0.5;
      border-radius: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      display: inline-block;
      position: absolute;
      bottom: 10px;
      left: 10px;
      text-align: center;
    }
  }
}
</style>
