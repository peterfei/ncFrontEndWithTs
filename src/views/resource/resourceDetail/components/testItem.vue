<template>
  <div class="task-item" @click="checkDialogInfo(iteminfo)">
    <div class="info">
      <i class="iconfont icon-ceyan"></i>
      <span class="title">{{ title }}</span>
      <span class="time">限时:{{ time }}min</span>
    </div>
    <div class="check">
      <span class="btn">查看</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {},
    index: {},
    time: {},
    iteminfo: {}
  },
  data() {
    return {
      hoveritem: ''
    }
  },
  methods: {
    // 点击查看Item
    checkDialogInfo(data) {
      this.$emit('showTestDialog', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.task-item {
  height: 50px;
  line-height: 50px;
  color: #4c5258;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebeff3;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  .info {
    .title {
      margin-right: 10px;
    }
    i {
      color: #8b9199;
      position: relative;
      top: 1px;
      margin-right: 10px;
    }
    .time {
      display: none;
    }
  }
  .check {
    .btn {
      width: 56px;
      height: 24px;
      line-height: 24px;
      background: #ffe4d8;
      border-radius: 3px;
      text-align: center;
      color: #ff783c;
      font-size: 14px;
      display: inline-block;
      display: none;
    }
  }
}
.task-item:hover {
  background: #fffcf2;
  color: #ff783c;
  i {
    color: #ff783c;
  }
  .btn {
    display: inline-block;
  }
  .time {
    color: #ff783c;
    display: inline-block;
  }
}
</style>
