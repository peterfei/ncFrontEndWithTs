<template>
  <div class="course-item">
    <div class="info">
      <i class="iconfont icon-shipin"></i>
      <span class="title">{{ title }}</span>
      <span class="time">({{ duration }})</span>
    </div>
    <div class="check">
      <span class="btn">查看</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course-item {
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
.course-item:hover {
  background: #fffcf2;
  color: #ff783c;
  .btn {
    display: inline-block;
  }
}
</style>

<script>
export default {
  props: {
    id: {},
    title: {},
    type: {}, // 类型
    index: {},
    duration: {} // 时长
  },
  data() {
    return {
      hoveritem: ''
    }
  }
}
</script>
