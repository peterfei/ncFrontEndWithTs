<template>
  <div class="videoHead">
    <!-- {path: `/cloud/cloudDetail/${item.last_issue ?
      item.last_issue.id : ''}/packages/${item.id}`} -->
    <router-link
      tag="span"
      :to="{
        path: `/cloud/cloudDetail/${mooc_issue_id}/packages/${mooc_package_id}`
      }"
    >
      <div class="head-left">
        <span><i class="icon iconfont icon-zuojiantouD"></i></span>
        <div class="title">{{ title }}</div>
      </div>
    </router-link>
    <div class="head-right">
      <img src="" alt="" class="code" />
      <div class="right-app">APP</div>
      <span><i class="icon iconfont icon-lingdang"></i></span>
      <div class="author"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoHead',
  props: {
    mooc_package_id: {},
    mooc_issue_id: {}
  },
  data() {
    return {
      title: '第1讲 hello，色彩'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.videoHead {
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  position: relative;
  z-index: 30;
  mix-blend-mode: multiply;
}
.videoHead .head-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.videoHead .head-left .icon-zuojiantouD {
  font-size: 26px;
  color: #0a121a;
}
.videoHead .head-left .title {
  margin-left: 18px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(10, 18, 26, 1);
}
.videoHead .head-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.videoHead .head-right .code {
  width: 16px;
  height: 16px;
  background: #eee;
}
.videoHead .head-right .right-app {
  margin-left: 6px;
  margin-right: 28px;
}
.videoHead .head-right .icon-lingdang {
  color: #737980;
  margin-right: 35px;
}
.videoHead .head-right .author {
  width: 32px;
  height: 32px;
  background: #eee;
  border-radius: 50%;
}
</style>
