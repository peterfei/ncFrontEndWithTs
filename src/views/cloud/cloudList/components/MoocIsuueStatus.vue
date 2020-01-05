<template>
  <div class="mooc-issue-status">
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
export interface IMoocOptions {
  value: number | null
  label: string
}
@Component({})
export default class MoocIsuueStatus extends Vue {
  // model: {
  //   prop: 'value'
  //   event: 'change'
  // }
  @Prop({ default: 0, type: Number }) value!: number
  public options: Array<IMoocOptions> = [
    { value: null, label: '全部' },
    { value: 1, label: '进行中' },
    { value: 0, label: '未开始' },
    { value: -1, label: '已结束' }
  ]
  onClick(val: any) {
    this.$emit('change', val)
  }
  //  @Model ('change', {type: Boolean})  checked!: boolean;
  @Model('prop', { type: Number }) change!: number | null
}
</script>

<style lang="scss" scoped>
.mooc-issue-status {
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
        background-color: #ff783c;
        color: #fff;
        border-radius: 12px;
      }
    }
  }
}
</style>
