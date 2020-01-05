<template>
  <div class="banner-nav-filter">
    <div class="banner-nav-filter-box">
      <div class="banner-nav-filter-item">
        <div class="banner-nav-filter-item-title word-spot">
          {{ title }}
        </div>
        <div class="banner-nav-filter-item-list">
          <span
            v-for="item in categoryList"
            :key="item.id"
            @click="categoryItem(item)"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
@Component
export default class BannerNavFilter extends Vue {
  @Prop({ default: 'value' }) title!: string
  @Prop({ default: () => [] }) categoryList!: Array<object>

  @Model('change', { type: Boolean }) readonly seleced!: boolean
  public categoryItem(item: any) {
    this.$emit('change', item)
  }
}
</script>

<style lang="scss" scoped>
.banner-nav-filter {
  width: 648px;
  height: 100%;
  background-color: #ffffff;
  .banner-nav-filter-box {
    width: 100%;
    padding: 18px 18px 0px;
    .banner-nav-filter-item {
      width: 100%;
      // border: 1px solid red;
      display: flex;
      flex-direction: row;
      .banner-nav-filter-item-title {
        width: 130px;
        overflow: hidden;
        font-size: 14px;
        font-weight: 400;
        color: #242b33;
        padding-right: 10px;
      }
      .banner-nav-filter-item-list {
        width: 450px;
        font-size: 12px;
        font-weight: 400;
        display: inline-block;
        color: #4c5258;
        & > span {
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 8px;
          cursor: pointer;
          color: #575e66;
          &:after {
            position: relative;
            top: -2px;
            content: '|';
            padding: 0 10px;

            color: #575e66 !important;
          }
          &:hover {
            color: #ff783c;
          }
        }
        & > span:last-child {
          &:after {
            position: relative;
            top: -2px;
            content: '';
            padding: 0;
          }
        }
      }
    }
  }
  h6 {
    text-align: center;
  }
}
</style>
