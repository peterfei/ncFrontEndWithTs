<template>
  <div class="task-item" @click="checkDialogInfo(iteminfo)">
    <div class="info">
      <i class="iconfont icon-zuoyelianxi"></i>
      <span class="title">{{title}}</span>
      <span class="operate" v-if="operate==1">上传</span>
      <span class="operate" v-else-if="operate==2">微博</span>
      <span class="operate" v-else>拖拽</span>
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
    operate: {},
    iteminfo: {},
  },
  data() {
    return {
      hoveritem: '',
    };
  },
  methods: {
    // 点击查看Item
    checkDialogInfo(data) {
      this.$emit('showTaskDialog', data);
    },
  },
};
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
    .title{
      margin-right: 10px;
    }
    i {
      color: #8b9199;
      position: relative;
      top: 1px;
      margin-right: 10px;
    }
    .operate {
      width: 40px;
      display: inline-block;
      height: 17px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(183, 187, 191, 1);
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: rgba(139, 145, 153, 1);
      line-height: 17px;
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
  i{
    color: #ff783c;
  }
  .btn {
    display: inline-block;
  }
  .operate{
    color: #ff783c;
    border-color: #ff783c;
  }
}
</style>
