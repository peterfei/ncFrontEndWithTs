<template>
  <div>
    <ul class="query-list">
      <li class="label">{{ label }}</li>
      <li
        @click="queryAll"
        :class="{ active: selected === null }"
        v-if="queryIsAll"
      >
        全部
      </li>

      <li
        v-for="option in options"
        :key="option.index"
        :class="{ active: option.id === selected }"
        @click="itemSeclected(option.id)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mockCourseCategory } from '@/mocks/index'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ISearchHotTags } from '@/types/index'
interface QueryItemOption {
  label: string
  id: number
}
@Component
export default class QueryItem extends Vue {
  searchInput: string = '' // 输入框内容
  public courseCategory: Array<object> = mockCourseCategory
  public selected: number | null = null
  @Prop({ default: null }) value: number | null
  @Prop({ default: '' }) label: string
  @Prop({ default: '' }) options: Array<QueryItemOption>
  @Prop({ default: true }) queryIsAll: boolean
  public itemSeclected(val: number | null) {
    this.selected = val
    this.$emit('change', val)
  }
  public queryAll() {
    this.itemSeclected(null)
  }
  mounted() {
    if (!this.queryIsAll && this.value === null) {
      this.itemSeclected(this.options[0].id)
    } else {
      this.selected = this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.query-list {
  padding-left: 0;
  display: flex;
  .active {
    background: #f5e9e4;
    border-radius: 4px;
    padding: 0px 22px;
    color: #db6735;
  }
  li {
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    height: 34px;
    line-height: 38px;
    color: #8b9199;
    margin-right: 30px;
    cursor: pointer;
  }
}
</style>
