<template>
  <div class="mooc-payment-status">
    <ul>
      <li
        :class="{ active: item.value === value }"
        v-for="(item, index) in options"
        :key="index"
        @click="onClick(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
export interface IMoocPayOptions {
  value: number | null
  label: string
}
@Component({})
export default class MoocIsuueStatus extends Vue {
  @Prop({ default: 0, type: Number }) value!: number
  public options: Array<IMoocPayOptions> = [
    { value: 2, label: '全部' },
    { value: 0, label: '免费' },
    { value: 1, label: '付费' }
  ]
  onClick(val: any) {
    this.$emit('change', val)
  }
  @Model('prop', { type: Number }) change!: number | null
}
</script>

<style lang="scss" scoped>
.mooc-payment-status {
  ul {
    padding: 0;
    li {
      display: inline-block;
      margin-right: 10px;
      font-size: 14px;
      padding: 3px 12px;
      cursor: pointer;
      color: #4c5258;
      &.active {
        background-color: #40c78d;
        color: #fff;
        border-radius: 12px;
      }
    }
  }
}
</style>
