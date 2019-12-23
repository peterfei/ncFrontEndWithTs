<template>
  <div class="mooc-issue-status">
    <ul>
      <li :class="{'active': item.value === value}"
        v-for="(item, index) in options"
        :key="index" @click="onClick(item.value)"> {{item.label}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MoocIsuueStatus',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      options: [
        { value: null, label: '全部' },
        { value: 1, label: '进行中' },
        { value: 0, label: '未开始' },
        { value: -1, label: '已结束' },
      ],
    };
  },
  methods: {
    onClick(val) {
      this.$emit('change', val);
    },
  },
};
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
      color: #4C5258;
      &.active {
        background-color:#FF783C;
        color: #fff;
        border-radius: 12px;
      }
    }
  }
}
</style>
